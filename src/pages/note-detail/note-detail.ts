import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { NoteProvider } from '../../providers/note-provider';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
  providers: [NoteProvider]
})
export class NoteDetailPage {

  note: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public noteProvider: NoteProvider) {
    this.note = this.navParams.get('note');
  }

  ionViewDidLoad() {
    console.log('==> NoteDetail->ionViewDidLoad()');
  }

  save(){
    console.log('==> NoteDetail->save()');
//    this.note = this.noteProvider.save(this.note);
    this.noteProvider.save(this.note).then((results) => {
      this.note = results;
    }), (failure) => {
      console.log('==> Load Notes Failed: ', failure);
    };
  }
}
