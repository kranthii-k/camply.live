import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/services/api.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';

export const useRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });
      navigate('/profile');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Registration failed',
        variant: 'destructive',
      });
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      queryClient.setQueryData(['currentUser'], response.data.data.user);
      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });
      navigate('/profile');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Login failed',
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
      navigate('/login');
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await authAPI.getCurrentUser();
      return response.data.data;
    },
    enabled: !!localStorage.getItem('accessToken'),
    retry: false,
  });
};