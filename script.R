library(sf)
library(mapdeck)

# Make sure your shapefile is in wgs84 projection. This is what mapdeck and leaflet 
dgtl <- st_read('input/dgtl.shp')

dgtl$height <- 8.0
dgtl$color <- '#3BC4D8'
dgtl$hover <- 'Main stage'


# Key for mapdeck, owned by Tes
key <- "pk.eyJ1IjoibWllZGVtYXRlcyIsImEiOiJjazV4dmVkbXcyMzQ3M2ttbG5kbzU3bWt4In0.G3RNl0RBO_tWTY1wYrv7tQ"

# Initialize mapdeck
# https://symbolixau.github.io/mapdeck/articles/mapdeck.html#the-basics
mapdeck(token = key, style = mapdeck_style("dark"), pitch = 30) %>%
  add_polygon(
    data = dgtl
    , layer = "polygon_layer"
    , fill_colour = "color"
    , elevation = "height"
    , auto_highlight = TRUE
    , tooltip = 'hover'
  )








