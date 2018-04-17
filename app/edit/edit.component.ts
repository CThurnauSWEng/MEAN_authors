import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params, Router} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id : any;
  authorDataAvailable = false;
  author: any;
  errorsPresent = false;
  errorMessage = "";

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    // get the data to display in edit form
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log("in ngONInit in Edit Component, id: ", this.id);
      this.authorDataAvailable = false;

      let observable = this._httpService.getAuthorById(this.id);
      observable.subscribe(data => {
        console.log("data from service: ", data);
        this.author = data;
        this.authorDataAvailable = true;
      });
    })
  }

  onSubmit(e){
    console.log("this method does the update, event: ", e)
    console.log("Task Id: ", e['target']['parentElement']['id']);
    console.log("in onSubmit: author: ", this.author);
    this.errorsPresent = false;
    let id = this.author['data'][0]['_id'];
    console.log("author id the easy way: ", id);
    var authorToUpdate = this.author['data'][0];
    console.log("sending to service: authorToUpdate: ", authorToUpdate)
    let observerable = this._httpService.updateAuthorById(authorToUpdate);
    observerable.subscribe(data => {
      console.log("Status from update Task: ", data['message']);
      if (data['message'] == "Error"){
        console.log("data - look at to find error: ", data);
        console.log("error message: ", data['error']['errors']['name']['message']);
        this.errorMessage = data['error']['errors']['name']['message'];
        this.errorsPresent = true;
        console.log("errorMessage: ",this.errorMessage);
        console.log("errorsPresent: ",this.errorsPresent);
      } else {
        console.log("rerouting on purpose");
        this.errorsPresent = false;
        this.authorDataAvailable = false;
        this._router.navigate(['/dashboard']);
      }
    })      
  }

}
