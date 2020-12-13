import React, { useEffect, useState } from 'react'
import '../App.css'
import api from '../services/API'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import moment from "moment";
import 'moment/min/locales'
import { Button } from '@material-ui/core';
moment.locale('fr')


const Weather = (props) => {
    const [weather, setWeather] = useState(null);

    const [searchVille, setSearchVille] = useState("Paris");

    useEffect(() => {
        search()
    }, []);


    const search = () => {
        api.getCurrentWeather(searchVille).then(res => {
            setWeather(res.data);
        }).catch(e => console.log(e));
    }

    return (
        <div className="contentCard">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField variant="filled" label="Chercher une ville" className="searchbar" onChange={e => setSearchVille(e.target.value)} value={searchVille} />
                <Button variant="contained" onClick={search}>Rechercher</Button>
            </div>
            {weather &&

                <Card variant="outlined" className="card">
                    <CardContent>


                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h2" component="h2" gutterBottom>
                                    {weather.request.query}
                                </Typography>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    {moment(weather.location.localtime).format('dddd DD MMMM HH:mm')}
                                </Typography>
                                <img src={weather.current.weather_icons[0]} />
                                <Typography variant="h5" component="h5" gutterBottom>
                                    {weather.current.weather_descriptions.join()}
                                </Typography>
                            </Grid >
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant="h1" component="h1" gutterBottom>
                                    {(weather.current.temperature)}°
                                <Typography variant="h4" component="h4" gutterBottom>
                                        Hum : {(weather.current.humidity)} / WindS :{weather.current.wind_speed}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            }
        </div>
    )
}
export default Weather;