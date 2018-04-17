import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authors = [];
  authorDataAvailable = false;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log("1");
    this.getAuthorsFromService();
  }

  deleteAuthor(id){
    console.log("delete author - id: ", id);
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe(data => {
      console.log("returned from delete service");
      if(data['message']=="Success"){
        console.log("success in componennt delete")
        this.getAuthorsFromService();
      } else {
        console.log("Error reported to component in delete call")
      }
    })
  }

  getAuthorsFromService(){
    console.log("called getAuthorsFromService")
    let observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      console.log("Got authors in component: ", data);
      if(data['message']=="Success"){
        console.log("success in componennt get authors")
        this.authors = data['data'];
        console.log("authors: ", this.authors)
        this.authorDataAvailable = true;
      } else {
        console.log("Error reported to component")
      }
    })
  }

}
