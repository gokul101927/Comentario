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
      imageData: ImageData;
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

export interface ImageData {
  imageUrl: string;
  imageId: string;
}

export interface Board {
    id: string;
    imageData: ImageData;
    title: string;
    description: string;
    url: string;
    username: string;
    feedbacks: Feedback[];
    self: boolean;
    urlClickCount: number;
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
  sentiment: SentimentType;
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

export enum DashboardSortTypes {
  Latest = "Latest",
  Oldest = "Oldest",
  MostFeedbacks = "Most Feedbacks",
  LeastFeedbacks= "Least Feedbacks"
}

export enum Roadmaptype {
  NONE = "NONE",
  PLANNED = "PLANNED",
  INPROGRESS = "INPROGRESS",
  LIVE = "LIVE",
}

export enum SentimentType {
  VERY_POSITIVE = "VERY_POSITIVE",
  POSITIVE = "POSITIVE",
  NEUTRAL = "NEUTRAL",
  NEGATIVE = "NEGATIVE",
  VERY_NEGATIVE = "VERY_NEGATIVE",
}

export interface Comment {
  commentId: string;
  profileUrl: string;
  username: string;
  commentTitle: string;
  sentiment: SentimentType;
}
  
export type UserState = Omit<User, 'verificationToken'>;