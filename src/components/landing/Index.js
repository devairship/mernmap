/**
 * Created by Raphson on 9/23/16.
 */
import React from 'react';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import DeveloperActions from '../../actions/DeveloperActions';
import DeveloperStore from '../../stores/DeveloperStore';
import L from 'leaflet';

var contentStyle = {
    height: '100%',
    width: '600px'
};
export default class Index extends React.Component{
    constructor(){
        super();
        L.Icon.Default.imagePath = "//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/";
        this.state = {
            geocoder: new google.maps.Geocoder(),
            markers: [],
            longitude: 3.540790900000047300,
            latitude: 6.523276500000000000,
            zoom: 3,
        }
    }

    componentDidMount() {
        DeveloperActions.fetchAllDevelopers();
        DeveloperStore.addChangeListener(this.handleDevelopersResult, 'fetchDevelopers');
    }

    componentWillUnmount(){
        DeveloperStore.removeChangeListener(this.handleDevelopersResult, 'fetchDevelopers');
    }

    handleDevelopersResult = () => {
        let result = DeveloperStore.getDevelopers();
        if(result.status == 200){
            this.setState({
                developers: result.data
            });
        }
        this.resolveDevelopersAddress();
    }

    resolveDevelopersAddress = () => {
        var map = L.map("map-main", {center: [this.state.latitude, this.state.longitude],zoom: this.state.zoom});
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {attribution: "OpenStreetMap"}).addTo(map);
        this.state.developers.map((developer, i) => {
            this.state.geocoder.geocode({'address': developer.address}, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0].geometry.location;
                    let marker = L.marker([result.lat(), result.lng()]).addTo(map);
                    marker.bindPopup("<strong>" + developer.username + "</strong>").openPopup();
                }
            });
            //console.log(developer);
        })
    }

    render(){
        return(
            <span>
                <NavBar />
                <div className="main-container" style={{minHeight: 580}}>
                    <div className="MeanMap">
                        <div style={{border: '1px solid #ccc', boxShadow: '10px 10px #000'}}>
                            <div id="map-main" className="leaflet-container-main"></div>
                            {/* Map goes here */}
                        </div>
                    </div>
                    <section className="features features-13">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
                                    <h4 className="text-white">MERN Stack Developers Dominating the Earth<br /></h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-meanpath" />
                                    <h5 className="text-white">Built With The MERN Stack</h5>
                                    <p>Proudly Built With The MERN Stack. Javascript from Front-End To Back-end.The
                                        MERN Stack community is building up.</p>
                                </div>
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-user-secret" />
                                    <h5 className="text-white">Developer Publicity</h5>
                                    <p>Meet Other MERN Stack Developers like You. Brew Top notch Code and
                                        Drink Beer Together. Get Connected and Hired. </p>
                                </div>
                                <div className="col-sm-4 feature">
                                    <i className="fa fa-laptop" />
                                    <h5 className="text-white">Hack, Sweat and Share</h5>
                                    <p>Be proud of the applications you've hacked with the MERN Stack,
                                        Showcase and share with the Community and World.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="cta cta-6">
                        <div className="container">
                            <div className="row v-align-children">
                                <div className="col-md-8 col-sm-7">
                                    <h3> MERN Developers are on the Planet..</h3>
                                    <p>...The Exhibition Of MERN Stack Developers. <strong>MERN CHAP 2:9 </strong></p>
                                </div>
                                <div className="col-md-4 col-sm-5 text-right">
                                    <a className="btn" href="page/about">More Info</a>
                                    <a className="btn btn-filled" href="user/create">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="social social-1 near-footer">
                        <div className="container">
                            <div className="row">
                                <div className="leader col-sm-12 text-center">
                    <span>
                      <i className="fa fa-quote-left" />
                      Any fool can write code that a computer can understand. <br className="visible-desktop" /> Good programmers write code that humans can understand.
                      <i className="fa fa-quote-right" />
                    </span>
                                    <h5 className="lead-author">- Martin Fowler</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </span>
        );
    }
}