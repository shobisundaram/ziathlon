import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { environment } from '../../../environments/environment';
import { NbDialogService } from '@nebular/theme';
import { GoogleMapLoaderService } from '../../services/google-map-loader.service';

@Component({
  selector: 'ngx-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent {
  countries = [];
  states = [];
  cities = [];
  maxPhoneLength: number;
  zoom = 18;
  drawing = false;
  center: google.maps.LatLngLiteral = { lat: 12.9024, lng: 77.5991 };
  // polygonPaths: google.maps.LatLngLiteral[] = []
  polygonPaths: google.maps.LatLngLiteral[] = [
    { lat: 12.9024, lng: 77.5991 },
    { lat: 12.9024, lng: 77.5996 },
    { lat: 12.9020, lng: 77.5996 },
    { lat: 12.9020, lng: 77.5991 }
  ];
  polygonOptions: google.maps.PolygonOptions = {
    editable: true,
    draggable: false,
    fillColor: '#4285F4',
    fillOpacity: 0.2,
    strokeColor: '#4285F4',
    strokeOpacity: 0.8,
    strokeWeight: 2
  };
  drawingManager: google.maps.drawing.DrawingManager;
  selectedShape: any;
  updateShape: any;
  pointList: any = [];
  polyOptions: any;
  map: any;
  @ViewChild("AddorEditDialog") AddorEditDialog: TemplateRef<any>;
  addorEditDialogDialogClose: import("@nebular/theme").NbDialogRef<any>;

  @ViewChild("ViewDialog") ViewDialog: TemplateRef<any>;
  viewDialogClose: import("@nebular/theme").NbDialogRef<any>;

  @ViewChild("FilterDialog") FilterDialog: TemplateRef<any>;
  FilterDialogClose: import("@nebular/theme").NbDialogRef<any>;

  @ViewChild("DeleteDialog") DeleteDialog: TemplateRef<any>;
  DeleteDialogClose: import("@nebular/theme").NbDialogRef<any>;
  
  data: any[] = [
    {
      index: '01',
      name: 'Ziathlon',
      category: 'Sports clinic',
      clinicId: 'CL001',
      address: 'High court road, near top n town, Bengaluru, karnataka 870098',
      contact: 'Aayush Sharma',
      contactno: '+91 89384 33455',
      status: 'Active'
    },
    {
      index: '05',
      name: 'Ziathlon',
      category: 'Medifit',
      clinicId: 'CL005',
      address: 'High court road, near top n town, Bengaluru, karnataka 870098',
      contact: 'Rashika Sharma',
      contactno: '+91 89384 33455',
      status: 'Inactive'
    }
  ]
  pageNum: any = 1;
  headers = [
    { field: 'index', header: '#' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'clinicId', header: 'Clinic ID' },
    { field: 'address', header: 'Address' },
    { field: 'contact', header: 'Contact Person' },
    { field: 'contactno', header: 'Contact No' },
    { field: 'status', header: 'Status' },
    { type: 'viewItem', header: 'View', icon: 'fa fa-eye' },
    { type: 'editItem', header: 'Edit', icon: 'fa-solid fa-pencil' },
    { type: 'deleteItem', header: 'Delete', icon: 'fa fa-trash' }
  ];
  localisationForm: FormGroup;
  availableStatus = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  categories = [
    { label: 'Sports Clinic', value: 'sportsClinic' },
    { label: 'Medifit', value: 'medifit' },
  ];
  selectedArea: number;
  filterForm: FormGroup;
  constructor(
    private locationService: LocationService,
    private readonly mapsLoader: GoogleMapLoaderService,
    private dialogService: NbDialogService
  ){}

  ngOnInit(){
    this.initialFilterForm()
    this.initialLocalisationForm()
    this.countries = this.locationService.getCountries();
    this.localisationForm.get('country')?.valueChanges.subscribe((countryCode: string) => {
      this.states = this.locationService.getStates(countryCode);
      this.cities = [];
      
      const stateControl = this.localisationForm.get('state');
      const cityControl = this.localisationForm.get('city');
      const filterstateControl = this.filterForm.get('state');
      const filtercityControl = this.filterForm.get('city');

      stateControl?.reset();
      cityControl?.reset();
      filterstateControl?.reset();
      filtercityControl?.reset();

      if (this.states.length) {
        stateControl?.enable();
        filterstateControl?.enable();
      } else {
        stateControl?.disable();
        filterstateControl?.disable()
      }

      cityControl?.disable();
      filtercityControl?.disable();
    });

    this.localisationForm.get('state')?.valueChanges.subscribe((stateCode: string) => {
      const countryCode = this.localisationForm.get('country')?.value;
      this.cities = this.locationService.getCities(countryCode, stateCode);
      const cityControl = this.localisationForm.get('city');
      const filtercityControl = this.filterForm.get('city');
      cityControl?.reset();
      filtercityControl?.reset();
      if (this.cities.length) {
        cityControl?.enable();
        filtercityControl?.enable();
      } else {
        cityControl?.disable();
        filtercityControl?.disable()
      }
    });

    this.localisationForm.get('city')?.valueChanges.subscribe((cityName: string) => {
      if(cityName != null){
      }
    });

    this.loadMap();
  }
  loadMap() {
    this.mapsLoader
      .load()
      .then((res) => {
        this.initializeMap();
      })
      .catch((err) => {
        console.error("Error loading Google Maps API:", err);
      });
  }
  selectedClinic: any = null;
  showView = false;
  showEdit = false;
  showDelete = false;
  showPassword: boolean
  initialFilterForm(){
    this.filterForm = new FormGroup({
      category: new FormControl(""),
      country: new FormControl(""),
      state: new FormControl(""),
      city: new FormControl(""),
      pincode: new FormControl(""),
      status: new FormControl(""),
    })
  }
  initialLocalisationForm(){
    this.localisationForm = new FormGroup(
      {
        id: new FormControl(""),
        name: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
        ]),
        clinicId: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
        pincode: new FormControl("", [Validators.required]),
        contactPersonName: new FormControl("", [Validators.required]),
        contactPersonEmail: new FormControl("", [Validators.email, Validators.required]),
        password:  new FormControl("", [
          Validators.required,
          Validators.pattern(environment.PasswordPattern),
        ]),
        phone: new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required]),

      },

    );
  }

  onAdd(event: any){

  }
  onFilter(event: any){
    this.openFilterDialog(this.FilterDialog)
  }
  openFilterDialog(dialog: TemplateRef<any>){
    this.FilterDialogClose = this.dialogService.open(dialog, {
      context: "Filter",
      autoFocus: false,
      dialogClass: 'dialog-lg',
      closeOnBackdropClick:
        environment.Nb_dialogbox_close_while_click_outside,
    });
  }
  onView(clinic: any) {
    this.openviewDialog(this.ViewDialog)
  }
  openviewDialog(dialog: TemplateRef<any>){
    this.viewDialogClose = this.dialogService.open(dialog, {
      context: "Clinic Boundary",
      autoFocus: false,
      dialogClass: 'clinic-dialog',
      closeOnBackdropClick:
        environment.Nb_dialogbox_close_while_click_outside,
    });
  }
  onEdit(clinic: any) {
    this.openaddoreditDialog(this.AddorEditDialog);
  }
  openaddoreditDialog(dialog: TemplateRef<any>){
    this.addorEditDialogDialogClose = this.dialogService.open(dialog, {
      context: "Enter Detail",
      autoFocus: false,
      dialogClass: 'dialog-lg',
      closeOnBackdropClick:
        environment.Nb_dialogbox_close_while_click_outside,
    });
    // this.initializechangepasswordForm();
  }
  deletePopUpData = {
    title: "Delete Localisation",
    data: " Are you sure you want to delete this?"
  };
  onDelete(event:any){
    this.openDeleteDialog(this.DeleteDialog);
  }
  openDeleteDialog(dialog: TemplateRef<any>) {
    this.DeleteDialogClose = this.dialogService.open(dialog, {
      autoFocus: false,
      closeOnBackdropClick:
        environment.Nb_dialogbox_close_while_click_outside,
    });
  }
  closeDeletePopup(event: string) {
    if (event === "close") {
      this.DeleteDialogClose.close();
    } else {
      this.deleteAdmin();
    }
  }
  deleteAdmin(){}
  confirmDelete() {
    this.data = this.data.filter(c => c !== this.selectedClinic);
    this.showDelete = false;
  }

  get name() {
    return this.localisationForm.get("name");
  }
  get category() {
    return this.localisationForm.get("category");
  }
  get clinicId() {
    return this.localisationForm.get("clinicId");
  }
  get country() {
    return this.localisationForm.get("country");
  }

  get state() {
    return this.localisationForm.get("state");
  }

  get city() {
    return this.localisationForm.get("city");
  }
  get address() {
    return this.localisationForm.get("address");
  }
  get pincode() {
    return this.localisationForm.get("pincode");
  }
  get contactPersonName() {
    return this.localisationForm.get("contactPersonName");
  }
  get contactPersonEmail() {
    return this.localisationForm.get("contactPersonEmail");
  }
  get password() {
    return this.localisationForm.get("password");
  }
  get phone() {
    return this.localisationForm.get("phone");
  }
  get status() {
    return this.localisationForm.get("status");
  }

  initializeMap(): void {
    const geocoder = new google.maps.Geocoder();
    const placeName = environment.GOOGLE_MAP_DEFAULT_LOCATION;

    geocoder.geocode({ address: placeName }, (results, status: string) => {
      if (status === "OK") {
        const centerCoords = results[0].geometry.location;

        this.map = new google.maps.Map(document.getElementById("trackerMap") as HTMLElement, {
          center: centerCoords,
          zoom: environment.MAP_ZOOM,
          streetViewControl: false,
          mapTypeControl: false
        });

        const options: google.maps.drawing.DrawingManagerOptions = {
          drawingControl: true,
          drawingControlOptions: {
            drawingModes: this.pointList.length === 0 ? [google.maps.drawing.OverlayType.POLYGON] : [],
          },
          polygonOptions: {
            draggable: false,
            editable: true,
            strokeColor: "#3366ff",
            strokeWeight: 3,
            fillOpacity: 0.1,
          },
          drawingMode: this.pointList.length === 0 ? google.maps.drawing.OverlayType.POLYGON : null,
        };

        this.drawingManager = new google.maps.drawing.DrawingManager(options);
        this.drawingManager.setMap(this.map);

        google.maps.event.addListener(this.drawingManager, "overlaycomplete", (event: any) => {
          if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            const paths = event.overlay.getPaths();
            for (let p = 0; p < paths.getLength(); p++) {
              google.maps.event.addListener(paths.getAt(p), "set_at", () => {
                if (!event.overlay.drag) {
                  this.updatePointList(event.overlay.getPath());
                }
              });
              google.maps.event.addListener(paths.getAt(p), "insert_at", () => {
                this.updatePointList(event.overlay.getPath());
              });
              google.maps.event.addListener(paths.getAt(p), "remove_at", () => {
                this.updatePointList(event.overlay.getPath());
              });
            }
            this.updatePointList(event.overlay.getPath());
            this.selectedShape = event.overlay;
            this.selectedShape.type = event.type;
          }

          if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            this.drawingManager.setDrawingMode(null);
            this.drawingManager.setOptions({
              drawingControl: false
            });
          }
        });

      } else {
        console.error("Geocode was not successful: " + status);
      }
    });
  }

  updatePointList(path: google.maps.MVCArray<google.maps.LatLng>) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
  }
  onMapClick(event: google.maps.MapMouseEvent) {
    if (!this.drawing || !event.latLng) return;
    this.polygonPaths.push({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

  toggleDrawing() {
    this.drawing = !this.drawing;
  }

  clearPolygon() {
    this.polygonPaths = [];
  }
  ngOnDestroy(): void {
    if (this.addorEditDialogDialogClose){
      this.addorEditDialogDialogClose.close();
    }
    if (this.viewDialogClose){
      this.viewDialogClose.close();
    }
    if(this.FilterDialogClose){
      this.FilterDialogClose.close();
    }
    if(this.DeleteDialogClose){
      this.DeleteDialogClose.close();
    }
  }
}
