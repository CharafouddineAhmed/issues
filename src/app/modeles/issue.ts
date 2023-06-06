export interface Issue {
  id?: String, 
  status?: 'isOpen' | 'isClose';
  title: any ;
  postBy?: String;
  dateCreated?: any;
  content: any;
  comments?: Comment[];
  type_name?: string;
  color_type: string;

}

export interface Comment {
  postBy?: String;
  datePosted?: any;
  content?: string;
  type?:string;
}

  
 