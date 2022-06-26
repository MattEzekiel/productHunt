import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    DirectionsRenderer,
    Autocomplete
} from '@react-google-maps/api';
import {useEffect, useRef, useState} from 'react'
import Styles from '../styles/GoogleMaps.module.css';
import Spinner from "./Spinner";
import React from "react";

function GoogleMaps({ setLatitud, setLongitud, latitud, longitud, setDireccion, direccion, detalle }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_GOOGLE,
        libraries: ['places']
    });

    const [map, setMap] = useState(/**@type google.maps.Map  */ (null));
    const [localizacion, setLocalizacion] = useState(latitud || longitud ? direccion : '');
    const [autocompletar, setAutocompletar] = useState({});
    const [center, setCenter] = useState(latitud || longitud ? { lat: Number(latitud), lng: Number(longitud) } : { lat: Number(-34.595951217761645), lng: Number(-58.456828095751796) });
    const [error, setError] = useState('');

    /** @type React.MutableRefObject<HTMLInputElement> */
    const lugar = useRef();

    useEffect(() => {
        if (latitud && longitud) {
            setCenter({
                lat: Number(latitud),
                lng: Number(longitud)
            })
        }
    },[latitud, longitud]);

    if (!isLoaded) return <Spinner />

    const buscar = async e => {
        e.preventDefault();
        const place = lugar.current.value;
        setLocalizacion(place);
        setDireccion(place)

        const geocoder = new google.maps.Geocoder();
        try {
            await geocoder.geocode({ 'address': place }, function (resultado, status) {
                if (status == 'OK') {
                    setCenter(resultado[0].geometry.location);
                    setLatitud(resultado[0].geometry.location.lat());
                    setLongitud(resultado[0].geometry.location.lng());
                } else {
                    setError('No se pudo encontrar esa dirección');
                }
            });
        } catch (e) {
            console.error(e);
            setError('No se pudo encontrar esa dirección');
        }

        setTimeout(() => {
            if (error !== '') {
                setError('');
            }
        },5000);
    }

    return (
        <div className={Styles.contenedor}>
            { !detalle && (
                <div
                    className={Styles.buscador}
                >
                    <label
                        htmlFor={"localizacion"}
                        className={"sr-only"}
                    >Indique la dirección del evento</label>
                    <Autocomplete
                        onLoad={(autocomplete) => setAutocompletar(autocomplete)}
                        onPlaceChanged={() => {
                            console.log(autocompletar.getPlace());
                        }}
                    >
                        <input
                            type={"text"}
                            placeholder={"Ingresar ubicación"}
                            className={Styles.inputs}
                            ref={lugar}
                            name={"localizacion"}
                            id={"localizacion"}
                            defaultValue={typeof direccion === "string" ? direccion : ''}
                        />
                    </Autocomplete>
                    <div
                        className={Styles.botones}
                    >
                        <button
                            className={Styles.centrar}
                            onClick={ () => map.panTo(center) }
                            type={"button"}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={"/static/img/location.png"} alt={"Centrar"} />
                        </button>
                        <button
                            className={Styles.buscar}
                            onClick={buscar}
                            type={"button"}
                        >Buscar</button>
                    </div>
                    { error && (
                        <p
                            className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"}
                            role={"alertdialog"}
                        >{error}</p>
                    )}
                </div>
            ) }
            <GoogleMap
                center={center}
                zoom={16}
                mapContainerStyle={{ width: '100vw', height: '100vh', maxWidth: "100%", maxHeight: "100%" }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
            >
                {localizacion && (
                    <>
                        <MarkerF
                            icon={{
                                url: '/static/img/location.svg',
                                anchor: new google.maps.Point(20, 40),
                                scaledSize: new google.maps.Size(40, 40)
                            }}
                            position={center}
                        />
                        <DirectionsRenderer directions={localizacion} />
                    </>
                )}
            </GoogleMap>
        </div>
    )
}

export default GoogleMaps;