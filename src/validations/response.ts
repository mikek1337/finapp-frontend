export type ResponseType<T> ={
  status: 'success' | 'error',
  data?:T 
};

export type PaginatedResponse<T> = {
  status: 'success' | 'error',
  data:{
    nextCursor?:string,
    data?:T
  }
}

