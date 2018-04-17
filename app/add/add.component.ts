import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  author: any;
  errorsPresent = false;
  errorMessage = "";

  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.author= {name: ""}
    this.errorMessage = "";
  }
  onSubmit(){
    console.log("onSubmit: ",this.author);
    let observable = this._httpService.addAuthor(this.author);
    observable.subscribe(data => {
      console.log("from add: 1", data);
      if (data['message']=="Error"){
        this.errorsPresent = true;
        console.log("data['error']: ", data['error'])
        console.log("data['error']['errors']['name']['message']: ", data['error']['errors']['name']['message'])
        this.errorMessage = data['error']['errors']['name']['message'];
      } else {
        this.errorsPresent = false;
        this.errorMessage = "";
      }
    })
    this.author = {name: ""}
    this._router.navigate(['/dashboard']);
  }

}
