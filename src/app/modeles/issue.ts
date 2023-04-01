export interface Issue {
  id?: String, 
  status?: 'isOpen' | 'isClose';
  title: any ;
  postBy?: String;
  dateCreated?: any;
  content: any;
  comments?: Comment[] 
}

export interface Comment {
  postBy?: String;
  datePosted?: any;
  content?: string;
  type?:string;
}
  
 