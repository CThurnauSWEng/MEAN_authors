import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors');
  }

  deleteAuthor(id){
    return this._http.delete('/author/'+id);
  }

  addAuthor(author){
    return this._http.post('/author/',author);
  }

  getAuthorById(id){
    console.log("in service getAuthorById, id: ", id);
    return this._http.get('/author/'+id);
  }

  updateAuthorById(author){
    console.log("in service updateAuthorById, author: ", author);
    var url_string = '/author/' + author._id;
    console.log("url_string: ", url_string);
    return this._http.put(url_string, author)
  }

}
