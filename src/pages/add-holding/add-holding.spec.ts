import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AddHoldingPage } from "./add-holding";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { NavMock, HoldingsProviderMock } from "../../../test-config/mocks-ionic";
import { HoldingsProvider } from "../../providers/holdings/holdings";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Home Page', function() {

    let comp: AddHoldingPage;
    let fixture: ComponentFixture<AddHoldingPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddHoldingPage],
            providers: [
                {
                    provide: NavController,
                    useClass: NavMock
                },
                {
                    provide: NavParams,
                    useClass: NavMock
                },
                {
                    provide: HoldingsProvider,
                    useClass: HoldingsProviderMock
                }
            ],
            imports: [
                IonicModule.forRoot(AddHoldingPage)
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(AddHoldingPage);
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('El componente add holding debe crearse', () => {
        expect(comp).toBeDefined();
    });

});