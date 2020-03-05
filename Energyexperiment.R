library(sf)
library(sp)
library(mapdeck)

# Make sure your shapefile is in wgs84 projection. This is what mapdeck and leaflet 

dgtl <- st_read("input/dgtl3stage.shp")
flows <- read.csv("input/energyflows.csv", sep = ";")

flows2$id <- seq_len(nrow(flows2))
flows2$stroke <- sample(1:3, size = nrow(flows2), replace = T)


dgtl$height <- 7.0

dgtl$color <- '#9B59B6'
dgtl$fill_opacity <- 225
dgtl$fill_colour <- "#2980B"
dgtl[1,"fill_colour"] <- "#2980B9"
dgtl[2,"fill_colour"] <- "#8E44AD"
dgtl[3,"fill_colour"] <- "#4A235A"
dgtl[4, "fill_colour"] <- "#A569BD"
dgtl[5, "fill_colour"] <- "#E74C3C"
dgtl[6, "fill_colour"] <- "#3498DB"
dgtl[7, "fill_colour"] <- "#3498DB"

dgtl$hover <- "Food court"

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
  )%>%
  
  add_arc(
    data = flows2
    , layer_id = ("arc_layer")
    , origin = c("start_long", "start_lat")
    , destination = c("end_long", "end_lat")
    , stroke_from = "Modular"
    , stroke_to = "Skyline"
    , stroke_width = "stroke"
    , auto_highlight = TRUE)

flows$stroke_to <- "#4A235A"
flows$stroke_from <- "A569BD"
