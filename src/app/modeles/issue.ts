export interface Issue {
  id?: String, 
  status?: 'open' | 'close';
  title: any ;
  postBy?: String;
  dateCreated?: any;
  content: any;
  comments?: Comment[] 
}

export interface Comment {
  postBy?: String;
  datePosted?: Date;
  content?: string;
}
  
 