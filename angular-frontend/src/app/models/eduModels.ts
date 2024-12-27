export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    startDate: Date;
    endDate: Date;
    totalModules: number;
  }
  export interface Content {
    id: number;
    title: string;
    description: string;
    courseId: number;
    course?: Course;  // Reference to the course
  }
  export interface Assessment {
    id: number;
    title: string;
    description: string;
    type: string; // e.g., "Quiz", "Assignment", "Exam"
    createdAt: Date;
    dueDate: Date;
    courseId: number;
    course?: {
      id: number;
      title: string;
    }; // Optional course information
    submissions?: Submission[]; // Optional submissions for the assessment
  }
  export interface Submission {
    id: number;
    studentName: string;
    submissionDate: Date;
    grade?: number;
    feedback?: string;
    assessmentId: number;
    content:string;
    submittedAt:Date,studentId:string
  }
  export interface ForumReply {
    id: number;
    authorId: string;  // Link to User or Student
    content: string;
    repliedAt: Date;
    forumPostId: number;  // Linked to the post it replies to
    forumPost?: ForumPost;  // Optional navigation property for ForumPost
  }
  export interface ForumPost {
    id: number;
    authorId: string;  // Link to User or Student
    title: string;
    content: string;
    postedAt: Date;
    courseId: number;  // Discussion related to a specific course
    course?: Course;  // Optional navigation property for Course
    replies: ForumReply[];  // Collection of replies
  }
  export interface Feedback {
    id: number;
    studentId: string;  // Link to Student/User
    courseId: number;  // Feedback related to a course
    comments: string;  // Actual feedback
    submittedAt: Date;
    rating: number;  // Rating (e.g., 1 to 5 stars)
    course?: Course;  // Optional navigation property for Course
  }
  
    
  