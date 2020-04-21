#   Script for the mobility map datavisualisation for DGTL festival
# Edited for this context by DGTL x AMS LL

                                        
library(sf)
library(mapdeck)

key <- "pk.eyJ1IjoibWllZGVtYXRlcyIsImEiOiJjazV4dmVkbXcyMzQ3M2ttbG5kbzU3bWt4In0.G3RNl0RBO_tWTY1wYrv7tQ"
set_token(key)

# load the datafile
artist_travel <- read.csv('input/artist_travel.csv',header = TRUE,sep=";")

mapdeck( token = key, style = 'mapbox://styles/mapbox/dark-v9', pitch = 0, padding = 0  ) %>%
  add_arc(
    data = artist_travel
    , layer_id = "arc_layer"
    , origin = c("start_lon", "start_lat")
    , destination = c("end_lon", "end_lat")
    , stroke_from = "from"
    , stroke_to = "to"
    , palette = "bupu"
    , stroke_width = "stroke"
    , auto_highlight = TRUE
    , tooltip = 'mode'
  )

#export the the map as html page and save it in the output folder to make it available online