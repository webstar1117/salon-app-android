import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {Pagination,Navigation,EffectFlip,SwiperOptions,EffectCoverflow,EffectCards
} from 'swiper';

import { Animation, AnimationController,Gesture, GestureController, ModalController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { PaysuccessPage } from '../modals/paysuccess/paysuccess.page';

SwiperCore.use([Pagination, Navigation, EffectCards,EffectFlip]);

declare var $: any;

@Component({
  selector: 'app-paybycard',
  templateUrl: './paybycard.page.html',
  styleUrls: ['./paybycard.page.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class PaybycardPage implements OnInit {
  anim:Animation;
  private content: TemplateRef<any>;
  @ViewChild('selectedCard',{ read: ElementRef, static: false }) element1: ElementRef;
  @ViewChild('selectionCard',{ read: ElementRef, static: false }) element2: ElementRef;
  @ViewChild('cardsContainer',{ read: ElementRef, static: false }) element3: ElementRef;
  activeIndex:any;
  @ViewChild('swiper') swiper:SwiperComponent
  public press: number = 0;
  balancecontrol:any = 'hidebalance';
  balancecontrol2:any = 'shownone';
  paybtncontrol:any = 'animate__animated animate__fadeInUp';
  config:SwiperOptions = {

    effect: 'cards',
    spaceBetween: 50,
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    navigation: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 500,
      modifier: 1,
      slideShadows: false
    },

    

  }

  config2:SwiperOptions = {

    effect: 'flip',
    spaceBetween: 50,
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    navigation: false
    

  }


  public cards = [
    {
      idd:0,
      id:'first',
      cardtype:"visa",
      balance:'9543.15',
      cardnumber:'1234 6789 2468 3691'
    },
    {
      idd:1,
      id:'second',
      cardtype:"master",
      balance:'2700.15',
      cardnumber:'4162 7845 6589 5855'
    },
    {
      idd:2,
      id:'third',
      cardtype:"ionic",
      balance:'2349.15',
      cardnumber:'7875 6565 6958 2355'
    }
  ]


  public cards2 = [
    {
      idd:0,
      id:'first',
      cardtype:"visa",
      balance:'9543.15',
      cardnumber:'1234 6789 2468 3691'
    },

    {}

    

  ]


public selectedId = this.cards[0].id;
public selectedBalance = this.cards[0].balance;

  constructor(private modalCtrl: ModalController,private animationCtrl: AnimationController,private cdr: ChangeDetectorRef) {
 
   }
  ngAfterContentChecked() {
    if(this.swiper)
     {
     this.swiper.updateSwiper({})
     }
  
  }

  goSelected(e) {
    
    if(this.DoubleTap())
    {
      this.animateRotate();
    }
   
  }

  goBackSelections()
  {
    if(this.DoubleTap())
    {
      this.reverseAnimateSelectedCards();
    }
  }


  DoubleTap()
  {
    
    this.press++
   if(this.press > 1)
   {
     return true;
   }

   else
   {
    let timer  = setTimeout(() => {
      this.press = 0;
      clearTimeout(timer);
  }, 500);
     return false
   }
  
  }


  ngOnInit() {

   if(this.swiper)
   {
     this.swiper.updateSwiper({})
   }
 

  }

  ngAfterViewInit()
  {

  }

  animateSelectedCards()   //Animate the selected card growing
  {
    

    const animation = this.animationCtrl
    .create()
    .addElement(this.element1.nativeElement)
    .duration(100)
    .iterations(1)
    .delay(200)
    .fromTo("transform","scale(0.2)","scale(0.9)")
    .fromTo("opacity","0","1");
    animation.play()

    this.balancecontrol = 'showbalance'
    this.balancecontrol2 = 'hidebalance'
    this.paybtncontrol = ''

  }



  reverseAnimateSelectedCards()    //Reverse the selected card animation
  {
    

    const animation = this.animationCtrl
    .create()
    .addElement(this.element1.nativeElement)
    .duration(100)
    .iterations(1)
    .fromTo("transform","scale(0.9)","scale(0.5)")
    .fromTo("opacity","1","0");
    animation.play()

    let showtimeout =setTimeout(() => {
      this.balancecontrol = 'hidebalance';
      this.balancecontrol2 = 'showbalance';
      this.reverseRotate()
      clearTimeout(showtimeout)
     }, 100);

  }


  public reverseRotate()  //set back the normal card selection 
  {
    

    const animation = this.animationCtrl
    .create()
    .addElement(this.element3.nativeElement)
    .duration(300)
    .iterations(1)
    .fromTo("top","-52vh","25vh")
    .fromTo("left","-20vh","0")
    .fromTo("transform", "rotate(90deg) scale(0.1)"," rotate(0deg) scale(1)" ) 
    .fromTo("opacity","","1")
    animation.play().then(()=>{
     
    })

    this.cdr.detectChanges();
    
  }


  public animateRotate() // rotate and send cards to selected card view
  {
    
    this.animateSelectedCards();

    const animation = this.animationCtrl
    .create()
    .addElement(this.element3.nativeElement)
    .duration(300)
    .iterations(1)
    .fromTo("top","50vh","-52vh")
    .fromTo("left","0","-20vh")
    .fromTo("transform", " rotate(0deg) scale(1)", "rotate(90deg) scale(0.1)") 
    .fromTo("opacity","1","0")
    animation.play().then(()=>{
     
    })

    
  }
  

  onSwiper(swiper) {
  

  }


  onSlideChange(event: any) {

    this.setOrders(event.realIndex);
    this.selectedId = this.cards[event.realIndex].id;
    this.selectedBalance = this.cards[event.realIndex].balance;
    this.cdr.detectChanges();

  }


  setOrders(index) {
    this.cards2 = []
    this.cards2.push(this.cards[index])
    this.cards2.push(this.cards[index])
    console.log(this.cards2);

    this.cdr.detectChanges();
}

  onSlideChange2(ev:any) {
    this.cdr.detectChanges();
  }


  showHide()
  {
  
   this.animateRotate();
  }



  pressed(ev)
  {
    console.log(ev);
  }


  onTend(ev)
  {

    this.selectedBalance = this.cards[ev.realIndex].balance;
    // setTimeout(() => {
    //   this.selectedBalance = this.cards[ev.realIndex].balance;
    // }, 5000);
  }


  async pay() {
    const modal = await this.modalCtrl.create({
      component: PaysuccessPage,
      cssClass: 'my-custom-class',
      mode:'ios',
      swipeToClose:true,
    });

    
    return await modal.present();
  }
   
  
}
