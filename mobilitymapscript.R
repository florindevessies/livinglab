library(sf)
library(mapdeck)

key <- "pk.eyJ1IjoibWllZGVtYXRlcyIsImEiOiJjazV4dmVkbXcyMzQ3M2ttbG5kbzU3bWt4In0.G3RNl0RBO_tWTY1wYrv7tQ"
set_token(key)

artist_travel <- read.csv('input/artist_travel.csv',header = TRUE,sep=";")

mapdeck( token = key, style = 'mapbox://styles/mapbox/dark-v9', pitch = 0, padding = 0  ) %>%
  add_arc(
    data = artist_travel
    , layer_id = "arc_layer"
    , origin = c("start_lon", "start_lat")
    , destination = c("end_lon", "end_lat")
    , stroke_from = "from"
    , stroke_to = "to"
    , stroke_width = "stroke"
    , auto_highlight = TRUE
    , tooltip = 'mode'
  )
