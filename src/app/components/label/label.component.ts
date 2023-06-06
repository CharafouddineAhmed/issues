import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Label } from 'src/app/modeles/label';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  createLabel : boolean = false;
  labelForm!: FormGroup; 
  private labelsCollection: AngularFirestoreCollection<Label>;
  labels: Observable<Label[]>;
  edited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) {
    this.labelsCollection = this.afs.collection<Label>('labels');
    this.labels = this.labelsCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Label;
        console.log(data);
        const id = a.payload.doc.id; 
        return {id, ...data}
      }) )
    );
    
  }

  ngOnInit(): void {
    this.labelForm = this.formBuilder.group({
      name: ['',], 
      description: ['', ],
      color: ['', ]
    })
  }

  goToEdited() {
    this.edited = true;
  }

  goToEditedCancel(){
    this.edited = false;
  }

  goToCreateLabel() {
    this.createLabel = true;
  }
  goToCreateLabelCancel() {
    this.createLabel = false;
  }

  addNewLabel() {

    const id = this.afs.createId();

    const label: Label = {
      name: this.labelForm.value.name, 
      description: this.labelForm.value.description,
      color: this.labelForm.value.color,
      dateCreated: new Date(),
      identifiant: id,
    };

    console.log( label);
    this.labelsCollection.doc(id).set(label)
      .then(() => {
        console.log("Ajouté");
        this.goToCreateLabelCancel();
      })
      .catch((e) => {
        console.log(e)
      })
  }

  deleteLabel(identifiant: string) {
    this.labelsCollection.doc(identifiant).delete()
      .then(() => console.log('suprimé'))
      .catch((e) => {
        console.log(e)
      })
  }

}
