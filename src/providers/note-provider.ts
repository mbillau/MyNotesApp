import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NoteProvider {

  private data: any;

  private BASE_URL = "https://30def268-2109-4334-8cd0-fdaf767319ff-bluemix.cloudant.com/mynotes/";
  private FIND_BODY = {
    "selector": {"_id": {"$gt": 0}},
    "fields": ["_id", "_rev", "title", "content"],
    "sort": [{"_id": "asc"}]
  };
  private credentials = "30def268-2109-4334-8cd0-fdaf767319ff-bluemix:e1bacd599b49b828480bb958f98eb69bd3a1d12127b2bfc8d0a863c25c56f3dd";

  constructor(public http: Http) {
    console.log('==> NoteProvider->constructor()');

  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa(this.credentials));
  }

  load() {
    console.log("==> NoteProvider->getNotes()");
    return new Promise(resolve => {

      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
      this.createAuthorizationHeader(headers);

      let options = new RequestOptions({method: RequestMethod.Post, headers: headers}); // Create a request option

      this.http.post(this.BASE_URL + "_find", this.FIND_BODY, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.debug('==> NoteProvider->load(): ' + JSON.stringify(data));
          resolve(this.data.docs);
        });
    });
  }

  save(note) {
    console.log("==> NoteProvider->save()");
    return new Promise(resolve => {

      //  Check to see if this is a new note or an existing note.
      if (note._id == "undefined" || note._id == null) {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);

        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});

        return this.http.post(this.BASE_URL, JSON.stringify(note), options)
          .map(res => res.json())
          .subscribe(data => {
            console.debug('==> NoteProvider->save() NEW: ' + JSON.stringify(data));
            resolve(note);
          });

      } else {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);

        let options = new RequestOptions({method: RequestMethod.Put, headers: headers});

        console.log("==> NoteProvider->save() UPDATE: Putting: " + JSON.stringify(note));

        return this.http.put(this.BASE_URL + note._id, JSON.stringify(note), options)
          .map(res => res.json())
          .subscribe(data => {
            note._rev = data.rev;
            console.debug('==> NoteProvider: ' + JSON.stringify(data));
            resolve(note);
          });

      }
    });
  }

  delete(note) {
    console.log("==> NoteProvider->delete(): " + JSON.stringify(note));
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({method: RequestMethod.Delete, headers: headers});

    return new Promise(resolve => {
      return this.http.delete(this.BASE_URL + note._id + '?rev=' + note._rev, options)
        .map(res => res.json())
        .subscribe(data => {
          console.debug('==> NoteProvider->delete(): ' + JSON.stringify(data));
          resolve(note);
        });

    });
  }
}
