import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput')nameInputRef: ElementRef;
  // @ViewChild('amountInput')amountInputRef: ElementRef;

 // @Output() ingredientAdded = new EventEmitter<Ingredient>();
 @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex:number;
  edittedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.edittedItemIndex = index;
          this.editMode = true;
          this.edittedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.edittedItem.name,
            amount: this.edittedItem.amount
          })
        }
      );

  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode) {
       this.shoppingListService.updateIngredient(this.edittedItemIndex,newIngredient);
      //this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else {
       this.shoppingListService.addIngredient(newIngredient);
      //this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      //this.ingredientAdded.emit(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    //this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {

    this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    //this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
 //   this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
