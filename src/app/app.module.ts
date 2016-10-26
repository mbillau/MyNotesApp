import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotesPage } from '../pages/notes/notes';
import { NoteDetailPage } from '../pages/note-detail/note-detail';

@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    NoteDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    NoteDetailPage
  ],
  providers: []
})
export class AppModule {}
