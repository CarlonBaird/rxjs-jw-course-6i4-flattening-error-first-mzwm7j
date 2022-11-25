import { EMPTY, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, map } from 'rxjs/operators';

const endpointInput: HTMLInputElement =
  document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

//Search for any of the following: food, not-existing-endpoint
fromEvent(fetchButton, 'click')
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`)
    ),
    catchError(() => EMPTY) //this emits a complete notification so that the subscription will not end if an error occurs.
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log('Error:', err),
  });
