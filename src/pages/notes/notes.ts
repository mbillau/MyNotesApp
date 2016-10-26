import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { NoteModel } from '../../models/NoteModel';
import { NoteProvider } from '../../providers/note-provider';
import { NoteDetailPage } from '../note-detail/note-detail';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
  providers: [NoteProvider]
})
export class NotesPage {

  notes: any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public noteProvider: NoteProvider) {


  }

  ionViewDidLoad() {
    console.log('==> Notes Page: ionViewDidLoad');
    this.loadNotes();
  }

  loadNotes(){
    console.log('==> NotesPage->loadNotes()');
    this.noteProvider.load().then((results) => {
      this.notes = results;
    }), (failure) => {
      console.log('==> Load Notes Failed: ', failure);
    };

  }

  viewNote(note) {
    console.log('==> NotesPage->viewNotes()');
    this.navCtrl.push(NoteDetailPage, {note: note});
  }

  addNote() {
    console.log('==> Notes Page: addNote()');
    let prompt = this.alertCtrl.create({
      title: 'New Note',
      message: 'Enter the name of your new note below:',
      inputs: [
        {name: 'name'}
      ],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            let newNote = new NoteModel(data.name, "");
            newNote.content = "";
            this.noteProvider.save(newNote).then((results) => {
                this.loadNotes();
            });
          }
        }
      ]
    });

    prompt.present();
  }

  removeNote(note) {
    console.log('==> NotesPage->removeNotes()');
    this.noteProvider.delete(note).then((results) => {
      this.loadNotes();
    }), (failure) => {
      console.log('==> Delete Note Failed: ', failure);
    };
  }

  refresh() {
    this.loadNotes();
  }

}
