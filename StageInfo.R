library(sf)
library(sp)
library(mapdeck)

# Make sure your shapefile is in wgs84 projection. This is what mapdeck and leaflet 

dgtl <- st_read("input/dgtl2stage.shp")
Stages <- read.csv("stageslocation.csv", header = TRUE , sep = ";")

dgtl$height <- 7.0
dgtl[1,"height"] <- 12.0
dgtl[2,"height"] <- 4.0
dgtl[3,"height"] <- 30.0
dgtl[4,"height"] <- 8.0

dgtl$color <- '#9B59B6'
dgtl[1,"color"]<-"#E8DAEF"
dgtl[2,"color"]<- "#BB8FCE"
dgtl[3,"color"]<- "#5B2C6F"
dgtl[4,"color"]<- "#2980B9"
dgtl[5,"color"]<- "#17A589"
dgtl[6,"color"]<- "#F5B041"
dgtl[7,"color"]<- "#3498DB"

dgtl$fill_opacity <- 225
dgtl$fill_colour <- "#2980B"
dgtl[1,"fill_colour"] <- "#2980B9"
dgtl[2,"fill_colour"] <- "#8E44AD"
dgtl[3,"fill_colour"] <- "#4A235A"
dgtl[4, "fill_colour"] <- "#A569BD"
dgtl[5, "fill_colour"] <- "#E74C3C"
dgtl[6, "fill_colour"] <- "#3498DB"
dgtl[7, "fill_colour"] <- "#3498DB"

dgtl$stages <- "Food court"
dgtl[1,"stages"]<-"Modular"
dgtl[2,"stages"]<- "Generator"
dgtl[3,"stages"]<- "Skyline"
dgtl[4,"stages"]<- "Stage6"
dgtl[5,"stages"]<- "Art"
dgtl[6,"stages"]<- "AMP"
dgtl[7,"stages"]<- "Life"

dgtl$hover <- "Food court"
dgtl[1,"hover"]<-"Info about stage"
dgtl[2,"hover"]<- "CO2 emission..."
dgtl[3,"hover"]<- "Nox emission"
dgtl[4,"hover"]<- "Most waste"
dgtl[5,"hover"]<- "Co2 reduction"
dgtl[6,"hover"]<- "info"
dgtl[7,"hover"]<- "info"

# Key for mapdeck, owned by Tes
key <- "pk.eyJ1IjoibWllZGVtYXRlcyIsImEiOiJjazV4dmVkbXcyMzQ3M2ttbG5kbzU3bWt4In0.G3RNl0RBO_tWTY1wYrv7tQ"

# Initialize mapdeck
# https://symbolixau.github.io/mapdeck/articles/mapdeck.html#the-basics
mapdeck(token = key, style = mapdeck_style("dark"), pitch = 30) %>%
  add_polygon(
    data = dgtl
    , layer = "polygon_layer"
    , fill_opacity = 225
    , fill_colour = "color"
    , elevation = "height"
    , auto_highlight = TRUE
    , tooltip = 'hover'
  ) %>% add_text(
    data = Stages
    , lon = "long"
    , lat = "lat"
    , text = "Name"
    , layer_id = "text"
        , size = 18
  )
