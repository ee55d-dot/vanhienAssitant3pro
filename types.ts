import type { ElementType } from 'react';

export enum Page {
  PersonalInfo = 'Thông tin cá nhân',
  LearningResults = 'Kết quả học tập',
  Schedule = 'Lịch học',
  CourseRegistration = 'Đăng ký học phần',
  AiAssistant = 'Trợ lý AI',
  Settings = 'Cài đặt',
}

export interface AiAssistantType {
  id: string;
  title: string;
  description: string;
  features: string[];
  // Fix: Imported ElementType from React to resolve namespace error.
  icon: ElementType;
  themeColor: string;
  gradient: string;
  buttonText: string;
}
