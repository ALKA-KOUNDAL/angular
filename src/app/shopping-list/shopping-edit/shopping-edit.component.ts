import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput')nameInputRef: ElementRef;
  // @ViewChild('amountInput')amountInputRef: ElementRef;

 // @Output() ingredientAdded = new EventEmitter<Ingredient>();
 @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex:number;
  edittedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex>-1){
        this.editMode = true;
        this.edittedItem = stateData.editedIngredient;
        this.edittedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode) {
      // this.shoppingListService.updateIngredient(this.edittedItemIndex,newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      //this.ingredientAdded.emit(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
   
    // this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
 //   this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
