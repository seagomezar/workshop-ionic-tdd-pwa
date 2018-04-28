import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { HomePage } from "./home";
import { IonicModule, NavController } from "ionic-angular";
import { NavMock, HoldingsProviderMock } from "../../../test-config/mocks-ionic";
import { HoldingsProvider } from "../../providers/holdings/holdings";

describe('Home Page', function() {

    let comp: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            providers: [
                {
                    provide: NavController,
                    useClass: NavMock
                },
                {
                    provide: HoldingsProvider,
                    useClass: HoldingsProviderMock
                }
            ],
            imports: [
                IonicModule.forRoot(HomePage)
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(HomePage);
        comp = fixture.componentInstance;
        comp.ionViewDidEnter();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('El componente home debe crearse', () => {
        expect(comp).toBeDefined();
    });

    it('Debería redirigir a la pagina de añadir holding', () => {
        spyOn(comp.navCtrl, 'push');
        comp.addHolding();
        expect(comp.navCtrl.push).toHaveBeenCalledWith('AddHoldingPage');
    });

    it('Debería refrescar la lista de holdings', () => {
        spyOn(comp.holdingsProvider, 'fetchPrices');
        comp.refreshPrices({complete: function(){}});
        expect(comp.holdingsProvider.fetchPrices).toHaveBeenCalled();
    });
    
});