interface User{
    id: {
        timestamp: number;
        date: string;
      };
      fullName: string;
      mailId: string;
      password: string;
      verificationToken: {
        userToken: string;
        expiryDate: string;
      };
      roles: Array<{
        authority: string;
      }>;
      profileImageUrl: string;
      boards: Board[];
      enabled: boolean;
      verified: boolean;
      accountNonExpired: boolean;
      accountNonLocked: boolean;
      credentialsNonExpired: boolean;
      username: string;
      authorities: Array<{
        authority: string;
      }>;
}

export interface Board {
    id: {
      timestamp: number;
      date: string;
    };
    coverImageUrl: string;
    title: string;
    description: string;
    url: string;
    username: string;
    feedbacks: Feedback[];
    self: boolean;
  }
  
export interface Feedback {
    feedback: string;
}
  
export type UserState = Omit<User, 'password' | 'verificationToken'>;