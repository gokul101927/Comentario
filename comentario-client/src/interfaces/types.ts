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
    id: string;
    coverImageUrl: string;
    title: string;
    description: string;
    url: string;
    username: string;
    feedbacks: Feedback[];
    self: boolean;
  }
  
export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: Category;
  upVoteUsernames: string[];
  comments: Comment[];
  boardId: string;
  username: string;
  profileUrl: string;
  upVoteCount: number;
  roadmap: Roadmaptype;
}

export interface UpVote {
  id: string;
  user: User;
  feedbacl: Feedback;
}

export enum Category {
  All = "All",
  UI = "UI",
  UX = "UX",
  Enhancement = "Enhancement",
  Feature = "Feature",
  Bug = "Bug"
}

export enum FeedbackSortTypes {
  MostUpVotes = "Most Upvotes",
  LeastUpVotes = "Least Upvotes",
  MostComments = "Most Comments",
  LeastComments = "Least Comments"
}

export enum Roadmaptype {
  NONE = "NONE",
  PLANNED = "PLANNED",
  INPROGRESS = "INPROGRESS",
  LIVE = "LIVE",
}

export interface Comment {
  profileUrl: string;
  username: string;
  commentTitle: string;
}
  
export type UserState = Omit<User, 'password' | 'verificationToken'>;