import {
  AfterViewInit,
  Component,
  DestroyRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { A11yModule } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  buffer,
  combineLatest,
  first,
  from,
  fromEvent,
  groupBy,
  interval,
  map,
  merge,
  mergeMap,
  of,
  reduce,
  takeUntil,
  tap,
} from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OverlayModule } from '@angular/cdk/overlay';
import { Store, StoreModule } from '@ngrx/store';
import { Item, StateT as UserState } from './user.reducer';
import { UserActions } from './user.actions';
import { selectuserlist } from './user.selectors';
import { State } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ComponentStore } from '@ngrx/component-store';

export interface UserLocal {
  name: string;
  sex: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClipboardModule,
    CdkAccordionModule,
    CommonModule,
    TextFieldModule,
    A11yModule,
    OverlayModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ComponentStore],
})
export class AppComponent implements OnInit, AfterViewInit {
  users: Item[] = [];
  usr$: Observable<Item[]> = of([]);
  title = 'f5';
  openOverlay = false;
  list = [
    { name: 'surag', address: 'vdk', age: 25 },
    { name: 'suee', address: 'vdk', age: 22 },
  ];

  @ViewChild('btnsample') btn!: any;
  readonly usersLocal$ = this.componentStore.select((state) => state.name);
  copied() {
    console.log('done');
  }

  header1 = 'header is';
  constructor(
    private vp: ViewportRuler,
    private nz: NgZone,
    private bpo: BreakpointObserver,
    private destroyRef: DestroyRef,
    private store: Store<State>,
    private componentStore: ComponentStore<UserLocal>
  ) {
    vp.change(300).subscribe(() => {
      this.nz.run(() => {
        this.header1 = 'header reset';
      });
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.btn.nativeElement, 'click')
      // interval(1000)
      .subscribe((x) => console.log(x));
  }
  ngOnInit(): void {
    this.bpo
      .observe('(max-width: 585px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        console.log(state);
      });

    //  this.store.select(selectuserlist).subscribe((data: Item[])=> {
    //   this.users = data
    //   console.log(data)})

    this.usr$ = this.store.select(selectuserlist, { isAdmin: false });

    this.componentStore.setState({ name: 'dany', sex: 'f' });

    // of(1,2,3).pipe(map(x=> x*2))
    // from(new Promise((resolve, reject)=> {setTimeout(() => {
    //   resolve('xelse')
    // }, 1000);}))
    // from([1,2,3,4])
    // const clicks = fromEvent(document, 'click');
    // const clicks = of(1,2,3,4,5)
    // const timer = of(10,11,12,13,14)
    // // const timer = interval(1000);
    // const clicksOrTimer = merge(clicks, timer);
    // clicksOrTimer.subscribe(x => console.log(x));
    // const clicks = fromEvent(document, 'click');
    // const intervalEvents = interval(1000);
    // const buffered = intervalEvents.pipe(buffer(clicks));
    // buffered.subscribe(x => console.log(x));
    // const letters = of('a', 'b', 'c');
    // const result = letters
    //   .pipe(mergeMap((x) => interval(1000).pipe(map((i) => x + i))))
    //   .subscribe((x) => console.log(x));

    // let gp$ = of({id:1, name: 'ssa'}, {id:2, name: 'wwer'}, {id:1, name: 'ssa'}, {id:3, name: 'dic'})
    // gp$.pipe(groupBy(p=>p.id),
    // mergeMap((group:any)=> group.pipe(reduce((acc: any, gp)=>[...acc, gp],[])))).subscribe(x=> console.log(x))

    const subj = new ReplaySubject<number>
setTimeout(() => {
subj.next(1)
subj.next(2)
}, 1000);
subj.subscribe(x=> console.log('2: '+x))
setTimeout(() => {
subj.subscribe(x=>console.log('1: ' +x))
subj.next(3)
}, 4000);


  }

  fetchUsers() {
    this.store.dispatch(
      UserActions.userUsersSuccess({
        data: [{ name: 'sukee', address: 'manal' }],
      })
    );
  }
}
