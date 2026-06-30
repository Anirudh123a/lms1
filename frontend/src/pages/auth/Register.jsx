import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField, Button, MenuItem, Container, Typography, Box,
  Link, InputAdornment, LinearProgress, Grid, IconButton, Alert,
  Chip, Divider
} from '@mui/material';
import {
  Visibility, VisibilityOff, ArrowForward, ArrowBack,
  LockOutlined, PersonOutlined, SchoolOutlined, CheckCircleOutlined
} from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

// ─── Yup schemas per step ──────────────────────────────────────────────────

const step0Schema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Enter a valid email address'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Include at least one uppercase letter')
    .matches(/[a-z]/, 'Include at least one lowercase letter')
    .matches(/[0-9]/, 'Include at least one number')
    .matches(/[^A-Za-z0-9]/, 'Include at least one special character (!@#$…)')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const step1Schema = yup.object({
  student_name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  roll_no: yup
    .string()
    .trim()
    .required('Roll number is required'),
  mobile: yup
    .string()
    .matches(/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit Indian mobile number')
    .required('Mobile number is required'),
  alternate_mobile: yup
    .string()
    .matches(/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit Indian mobile number')
    .nullable()
    .transform(v => (v === '' ? null : v)),
  date_of_birth: yup
    .string()
    .nullable()
    .transform(v => (v === '' ? null : v))
    .test('dob-range', 'Date of birth must be between 1950 and today', value => {
      if (!value) return true;
      const d = new Date(value);
      const now = new Date();
      const minDate = new Date('1950-01-01');
      return d >= minDate && d <= now;
    }),
  gender: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Select a gender')
    .required('Gender is required'),
  blood_group: yup.string().nullable().transform(v => (v === '' ? null : v)),
  address: yup.string().nullable().transform(v => (v === '' ? null : v)),
  city: yup.string().nullable().transform(v => (v === '' ? null : v)),
  state: yup.string().nullable().transform(v => (v === '' ? null : v)),
  pincode: yup
    .string()
    .matches(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit pincode')
    .nullable()
    .transform(v => (v === '' ? null : v)),
});

const step2Schema = yup.object({
  college_id: yup.string().required('Select your college'),
  department_id: yup.string().nullable().transform(v => (v === '' ? null : v)),
  degree: yup.string().required('Select your degree / programme'),
  education_level: yup.string().required('Select education level'),
  year_of_study: yup.string().required('Select your year of study'),
  semester: yup.string().required('Select your current semester'),
  batch: yup.string().nullable().transform(v => (v === '' ? null : v)),
  admission_no: yup.string().nullable().transform(v => (v === '' ? null : v)),
  admission_date: yup
    .string()
    .nullable()
    .transform(v => (v === '' ? null : v))
    .test('admission-date', 'Admission date cannot be in the future', value => {
      if (!value) return true;
      return new Date(value) <= new Date();
    }),
  graduation_date: yup
    .string()
    .nullable()
    .transform(v => (v === '' ? null : v))
    .test('graduation-date', 'Graduation date must be after admission date', function (value) {
      if (!value) return true;
      const admission = this.parent.admission_date;
      if (!admission) return true;
      return new Date(value) > new Date(admission);
    }),
});

const STEP_SCHEMAS = [step0Schema, step1Schema, step2Schema];

// ─── Helpers ───────────────────────────────────────────────────────────────

function pwStrength(pwd) {
  let s = 0;
  if (pwd.length >= 8) s += 25;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s += 25;
  if (/[0-9]/.test(pwd)) s += 25;
  if (/[^A-Za-z0-9]/.test(pwd)) s += 25;
  if (s <= 25) return { val: s, label: 'Weak', color: 'error' };
  if (s <= 75) return { val: s, label: 'Medium', color: 'warning' };
  return { val: s, label: 'Strong', color: 'success' };
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontSize: '0.9rem',
    bgcolor: 'background.default',
  },
};

function Label({ children, required }) {
  return (
    <Typography
      variant="caption"
      fontWeight={700}
      sx={{
        display: 'block',
        mb: 0.7,
        color: 'text.secondary',
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: 'error.main', ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

// ─── Step indicator (3 steps) ──────────────────────────────────────────────

const STEPS = [
  { label: 'Account', icon: LockOutlined },
  { label: 'Personal', icon: PersonOutlined },
  { label: 'Academic', icon: SchoolOutlined },
];

function StepRail({ active }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, mb: 4 }}>
      {STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        const Icon = step.icon;
        return (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.7 }}>
              <Box
                component={motion.div}
                animate={{
                  background:
                    done || current ? 'linear-gradient(135deg, #623E98, #9B75C9)' : undefined,
                  borderColor: done || current ? 'transparent' : undefined,
                  scale: current ? 1.12 : 1,
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: 'divider',
                  bgcolor: done || current ? undefined : 'background.default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: current ? '0 4px 16px rgba(98,62,152,0.35)' : 'none',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {done ? (
                  <CheckCircleOutlined sx={{ fontSize: 20, color: '#fff' }} />
                ) : (
                  <Icon sx={{ fontSize: 18, color: done || current ? '#fff' : 'text.disabled' }} />
                )}
              </Box>
              <Typography
                variant="caption"
                fontWeight={current ? 700 : 500}
                sx={{
                  color: current ? 'primary.main' : done ? 'text.secondary' : 'text.disabled',
                  fontSize: '0.7rem',
                }}
              >
                {step.label}
              </Typography>
            </Box>
            {i < STEPS.length - 1 && (
              <Box
                sx={{
                  width: { xs: 40, sm: 72 },
                  height: 2,
                  mx: 0.5,
                  mb: 3,
                  borderRadius: 1,
                  background:
                    i < active
                      ? 'linear-gradient(90deg, #623E98, #9B75C9)'
                      : 'rgba(0,0,0,0.1)',
                  transition: 'background 0.4s',
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Step 0: Account ──────────────────────────────────────────────────────

function Step0({ form }) {
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);
  const { register, watch, formState: { errors } } = form;
  const pwd = watch('password', '');
  const str = pwStrength(pwd);

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Label required>Email Address</Label>
        <TextField
          placeholder="you@college.edu"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ autoComplete: 'email' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label required>Password</Label>
        <TextField
          placeholder="Create a strong password"
          type={showPw ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ autoComplete: 'new-password' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShowPw(p => !p)} edge="end">
                  {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {pwd && (
          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={str.val}
              color={str.color}
              sx={{ height: 4, borderRadius: 2, mb: 0.5 }}
            />
            <Typography variant="caption" color={`${str.color}.main`} fontWeight={700}>
              {str.label}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label required>Confirm Password</Label>
        <TextField
          placeholder="Repeat your password"
          type={showCp ? 'text' : 'password'}
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ autoComplete: 'new-password' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShowCp(p => !p)} edge="end">
                  {showCp ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ borderRadius: '10px', fontSize: '0.82rem' }}>
          After submitting, a verification code will be sent to your email. Your account needs
          college approval before it becomes active.
        </Alert>
      </Grid>
    </Grid>
  );
}

// ─── Step 1: Personal ─────────────────────────────────────────────────────

function Step1({ form }) {
  const { register, formState: { errors } } = form;

  // Max DOB = today; min = 1950-01-01
  const today = new Date().toISOString().split('T')[0];

  return (
    <Grid container spacing={2.5}>
      {/* Row 1 */}
      <Grid item xs={12} sm={6}>
        <Label required>Full Name</Label>
        <TextField
          placeholder="As on college ID"
          {...register('student_name')}
          error={!!errors.student_name}
          helperText={errors.student_name?.message}
          fullWidth
          size="small"
          sx={inputSx}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label required>Roll Number</Label>
        <TextField
          placeholder="e.g. MCA2024001"
          {...register('roll_no')}
          error={!!errors.roll_no}
          helperText={errors.roll_no?.message}
          fullWidth
          size="small"
          sx={inputSx}
        />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} sm={6}>
        <Label required>Mobile Number</Label>
        <TextField
          placeholder="10-digit mobile number"
          {...register('mobile')}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ maxLength: 10, inputMode: 'numeric' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.88rem' }}>
                  +91
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label>Alternate Mobile</Label>
        <TextField
          placeholder="Optional"
          {...register('alternate_mobile')}
          error={!!errors.alternate_mobile}
          helperText={errors.alternate_mobile?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ maxLength: 10, inputMode: 'numeric' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.88rem' }}>
                  +91
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} sm={4}>
        <Label required>Gender</Label>
        <TextField
          select
          defaultValue=""
          {...register('gender')}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          fullWidth
          size="small"
          sx={inputSx}
        >
          <MenuItem value="MALE">Male</MenuItem>
          <MenuItem value="FEMALE">Female</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Date of Birth</Label>
        <TextField
          type="date"
          {...register('date_of_birth')}
          error={!!errors.date_of_birth}
          helperText={errors.date_of_birth?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ max: today, min: '1950-01-01' }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Blood Group</Label>
        <TextField
          select
          defaultValue=""
          {...register('blood_group')}
          error={!!errors.blood_group}
          helperText={errors.blood_group?.message}
          fullWidth
          size="small"
          sx={inputSx}
        >
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Address section */}
      <Grid item xs={12}>
        <Divider sx={{ my: 0.5 }}>
          <Chip label="Address" size="small" sx={{ fontSize: '0.7rem', fontWeight: 700 }} />
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <Label>Street / Door No.</Label>
        <TextField
          placeholder="House no., Street, Area"
          {...register('address')}
          fullWidth
          size="small"
          sx={inputSx}
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>City</Label>
        <TextField placeholder="City" {...register('city')} fullWidth size="small" sx={inputSx} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>State</Label>
        <TextField select defaultValue="" {...register('state')} fullWidth size="small" sx={inputSx}>
          {[
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
            'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
            'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
            'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
            'Delhi', 'Puducherry', 'Chandigarh', 'Ladakh', 'J&K',
          ].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Pincode</Label>
        <TextField
          placeholder="6-digit pincode"
          {...register('pincode')}
          error={!!errors.pincode}
          helperText={errors.pincode?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ maxLength: 6, inputMode: 'numeric' }}
        />
      </Grid>
    </Grid>
  );
}

// ─── Step 2: Academic ─────────────────────────────────────────────────────

// Maps year → semester options
const SEMESTER_MAP = {
  '1': ['Semester 1', 'Semester 2'],
  '2': ['Semester 3', 'Semester 4'],
  '3': ['Semester 5', 'Semester 6'],
  '4': ['Semester 7', 'Semester 8'],
  '5': ['Semester 9', 'Semester 10'],
};

function Step2({ form, collegeOptions, departmentOptions, loadingColleges }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedCollege = watch('college_id');
  const yearOfStudy = watch('year_of_study');

  // Reset semester when year changes
  useEffect(() => {
    setValue('semester', '');
  }, [yearOfStudy, setValue]);

  const semesterOptions = SEMESTER_MAP[yearOfStudy] || [];

  // Min for graduation date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <Grid container spacing={2.5}>
      {/* Row 1: College + Department */}
      <Grid item xs={12} sm={6}>
        <Label required>College</Label>
        <TextField
          select
          defaultValue=""
          {...register('college_id')}
          error={!!errors.college_id}
          helperText={errors.college_id?.message}
          fullWidth
          size="small"
          sx={inputSx}
          disabled={loadingColleges}
        >
          {loadingColleges ? (
            <MenuItem value="" disabled>Loading…</MenuItem>
          ) : collegeOptions.length === 0 ? (
            <MenuItem value="" disabled>No colleges available</MenuItem>
          ) : (
            collegeOptions.map(c => (
              <MenuItem key={c.id} value={String(c.id)}>{c.college_name}</MenuItem>
            ))
          )}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label>Department</Label>
        <TextField
          select
          defaultValue=""
          {...register('department_id')}
          fullWidth
          size="small"
          sx={inputSx}
          disabled={!selectedCollege || departmentOptions.length === 0}
        >
          <MenuItem value="">— None / Not assigned —</MenuItem>
          {departmentOptions.map(d => (
            <MenuItem key={d.id} value={String(d.id)}>{d.name}</MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Row 2: Education Level + Degree */}
      <Grid item xs={12} sm={6}>
        <Label required>Education Level</Label>
        <TextField
          select
          defaultValue="undergraduate"
          {...register('education_level')}
          error={!!errors.education_level}
          helperText={errors.education_level?.message}
          fullWidth
          size="small"
          sx={inputSx}
        >
          <MenuItem value="undergraduate">Undergraduate (UG)</MenuItem>
          <MenuItem value="postgraduate">Postgraduate (PG)</MenuItem>
          <MenuItem value="diploma">Diploma</MenuItem>
          <MenuItem value="phd">Doctorate (Ph.D)</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Label required>Degree / Programme</Label>
        <TextField
          select
          defaultValue=""
          {...register('degree')}
          error={!!errors.degree}
          helperText={errors.degree?.message}
          fullWidth
          size="small"
          sx={inputSx}
        >
          {[
            'B.E.', 'B.Tech', 'B.Sc', 'B.Com', 'B.A', 'BCA', 'BBA',
            'MCA', 'M.Tech', 'M.Sc', 'M.Com', 'M.A', 'MBA',
            'Diploma', 'Ph.D', 'Other',
          ].map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </TextField>
      </Grid>

      {/* Row 3: Year + Semester + Batch */}
      <Grid item xs={12} sm={4}>
        <Label required>Year of Study</Label>
        <TextField
          select
          defaultValue=""
          {...register('year_of_study')}
          error={!!errors.year_of_study}
          helperText={errors.year_of_study?.message}
          fullWidth
          size="small"
          sx={inputSx}
        >
          {[1, 2, 3, 4, 5].map(y => (
            <MenuItem key={y} value={String(y)}>Year {y}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label required>Current Semester</Label>
        <TextField
          select
          defaultValue=""
          {...register('semester')}
          error={!!errors.semester}
          helperText={errors.semester?.message || (!yearOfStudy ? 'Select year first' : '')}
          fullWidth
          size="small"
          sx={inputSx}
          disabled={!yearOfStudy}
        >
          {semesterOptions.length === 0 ? (
            <MenuItem value="" disabled>Select year first</MenuItem>
          ) : (
            semesterOptions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))
          )}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Batch</Label>
        <TextField
          placeholder="e.g. 2022–2026"
          {...register('batch')}
          fullWidth
          size="small"
          sx={inputSx}
        />
      </Grid>

      {/* Admission Details section */}
      <Grid item xs={12}>
        <Divider sx={{ my: 0.5 }}>
          <Chip
            label="Admission Details"
            size="small"
            sx={{ fontSize: '0.7rem', fontWeight: 700 }}
          />
        </Divider>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Admission Number</Label>
        <TextField
          placeholder="Optional"
          {...register('admission_no')}
          fullWidth
          size="small"
          sx={inputSx}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Admission Date</Label>
        <TextField
          type="date"
          {...register('admission_date')}
          error={!!errors.admission_date}
          helperText={errors.admission_date?.message}
          fullWidth
          size="small"
          sx={inputSx}
          inputProps={{ max: today }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Label>Expected Graduation</Label>
        <TextField
          type="date"
          {...register('graduation_date')}
          error={!!errors.graduation_date}
          helperText={errors.graduation_date?.message}
          fullWidth
          size="small"
          sx={inputSx}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: yupResolver(STEP_SCHEMAS[step]),
    mode: 'onBlur',
    defaultValues: formData,
  });

  // Fetch colleges
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/colleges`)
      .then(res => setCollegeOptions(res.data.colleges || []))
      .catch(() => setCollegeOptions([]))
      .finally(() => setLoadingColleges(false));
  }, []);

  // Fetch departments on college change
  const selectedCollege = form.watch('college_id');
  useEffect(() => {
    if (!selectedCollege) { setDepartmentOptions([]); return; }
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/departments?college_id=${selectedCollege}`
      )
      .then(res => setDepartmentOptions(res.data.departments || []))
      .catch(() => setDepartmentOptions([]));
  }, [selectedCollege]);

  const handleNext = form.handleSubmit(data => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    if (step < 2) {
      setStep(s => s + 1);
      form.reset(merged);
    } else {
      submitAll(merged);
    }
  });

  const handleBack = () => {
    const current = form.getValues();
    setFormData(prev => ({ ...prev, ...current }));
    setStep(s => s - 1);
    form.reset({ ...formData, ...current });
  };

  const submitAll = async data => {
    setSubmitting(true);
    try {
      const n = v => (v === '' || v === undefined ? null : v);
      const payload = {
        email: data.email,
        password: data.password,
        role: 'STUDENT',
        student_name: data.student_name,
        roll_no: data.roll_no,
        mobile: data.mobile,
        alternate_mobile: n(data.alternate_mobile),
        date_of_birth: n(data.date_of_birth),
        gender: data.gender,
        blood_group: n(data.blood_group),
        address: n(data.address),
        city: n(data.city),
        state: n(data.state),
        pincode: n(data.pincode),
        college_id: data.college_id ? parseInt(data.college_id) : null,
        department_id: data.department_id ? parseInt(data.department_id) : null,
        education_level: data.education_level || 'undergraduate',
        degree: n(data.degree),
        year_of_study: data.year_of_study ? parseInt(data.year_of_study) : null,
        semester: n(data.semester),
        batch: n(data.batch),
        admission_no: n(data.admission_no),
        admission_date: n(data.admission_date),
        graduation_date: n(data.graduation_date),
        origin_type: 'COLLEGE',
      };
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, payload);
      toast.success('Account created! Check your email for the verification code.');
      navigate('/auth/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
      setStep(0);
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitles = [
    ['Account Setup', 'Your login credentials'],
    ['Personal Info', 'Identity & contact details'],
    ['Academic Details', 'College, programme & batch'],
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0f0c1a 0%, #16102a 100%)'
            : 'linear-gradient(150deg, #f5f0ff 0%, #ede8f7 50%, #f9f8ff 100%)',
        py: { xs: 4, md: 6 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <Box
        sx={{
          position: 'absolute', top: '5%', right: '6%', width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(155,117,201,0.16) 0%, transparent 70%)',
          filter: 'blur(55px)', pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute', bottom: '8%', left: '4%', width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(98,62,152,0.12) 0%, transparent 70%)',
          filter: 'blur(45px)', pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1.5,
                px: 2, py: 0.7, borderRadius: '20px',
                background: 'linear-gradient(90deg, rgba(98,62,152,0.1), rgba(155,117,201,0.1))',
                border: '1px solid rgba(155,117,201,0.28)',
              }}
            >
              <SchoolOutlined sx={{ fontSize: 15, color: '#9B75C9' }} />
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: '#9B75C9', letterSpacing: '0.6px', textTransform: 'uppercase', fontSize: '0.7rem' }}
              >
                Student Registration
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px', mb: 0.4 }}>
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Already registered?{' '}
              <Link
                component={RouterLink}
                to="/auth/login"
                fontWeight={700}
                color="primary.main"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>

          {/* Card */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: '20px',
              bgcolor: 'background.paper',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)'
                  : '0 8px 40px rgba(98,62,152,0.1), 0 0 0 1px rgba(155,117,201,0.14)',
            }}
          >
            {/* Step rail */}
            <StepRail active={step} />

            {/* Step heading */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.3px' }}>
                    {stepTitles[step][0]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stepTitles[step][1]}
                  </Typography>
                </Box>
                <Chip
                  label={`${step + 1} / 3`}
                  size="small"
                  sx={{
                    fontWeight: 700, fontSize: '0.72rem',
                    background: 'linear-gradient(90deg, #623E98, #9B75C9)',
                    color: '#fff', height: 24,
                  }}
                />
              </Box>
              <Box sx={{ mt: 1.5, height: 3, borderRadius: 2, bgcolor: 'divider', overflow: 'hidden' }}>
                <Box
                  component={motion.div}
                  animate={{ width: `${((step + 1) / 3) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #623E98, #9B75C9)',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>

            {/* Animated step content */}
            <Box component="form" noValidate>
              <AnimatePresence mode="wait">
                <Box
                  key={step}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {step === 0 && <Step0 form={form} />}
                  {step === 1 && <Step1 form={form} />}
                  {step === 2 && (
                    <Step2
                      form={form}
                      collegeOptions={collegeOptions}
                      departmentOptions={departmentOptions}
                      loadingColleges={loadingColleges}
                    />
                  )}
                </Box>
              </AnimatePresence>

              {/* Nav buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                {step > 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      flex: 1, py: 1.4, borderRadius: '12px',
                      fontWeight: 700, textTransform: 'none', fontSize: '14px',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: '#9B75C9', color: '#623E98',
                        bgcolor: 'rgba(98,62,152,0.04)',
                      },
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  endIcon={step < 2 ? <ArrowForward /> : null}
                  disabled={submitting}
                  component={motion.button}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    flex: step === 0 ? 1 : 2,
                    py: 1.4,
                    borderRadius: '12px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '14px',
                    background: submitting
                      ? undefined
                      : 'linear-gradient(90deg, #623E98, #9B75C9)',
                    boxShadow: '0 4px 18px rgba(98,62,152,0.32)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #4d2f7a, #7a5aac)',
                      boxShadow: '0 6px 22px rgba(98,62,152,0.42)',
                    },
                  }}
                >
                  {submitting ? 'Submitting…' : step < 2 ? 'Continue' : 'Create Account'}
                </Button>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="caption"
            color="text.disabled"
            align="center"
            sx={{ display: 'block', mt: 3, lineHeight: 1.6 }}
          >
            By registering, your data is managed in accordance with your institution's privacy
            policy.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
