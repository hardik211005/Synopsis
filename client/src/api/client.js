import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadResumeApi = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeResumeApi = async (resumeId, jobDescription, targetJobTitle) => {
  const response = await api.post('/analyze', {
    resumeId,
    jobDescription,
    targetJobTitle,
  });
  return response.data;
};

export const getJobRecommendationsApi = async (resumeId) => {
  const response = await api.get(`/jobs/recommendations/${resumeId}`);
  return response.data;
};

export const getAllJobsApi = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

export const getHistoryApi = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const getAnalysisByIdApi = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};

export const deleteAnalysisApi = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};

export default api;
