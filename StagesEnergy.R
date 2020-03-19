library(sf)
library(sp)
library(mapdeck)
library(plotly)



# Make sure your shapefile is in wgs84 projection. This is what mapdeck and leaflet 

dgtl <- st_read("input/dgtlAll.shp")
flows2 <- read.csv("input/energyflows.csv", sep = ";")

flows2$id <- seq_len(nrow(flows2))
flows2$stroke <- sample(1:3, size = nrow(flows2), replace = T)



dgtl$height <- 10
dgtl[1,"height"] <- 10.0
dgtl[2,"height"] <- 10
dgtl[3,"height"] <- 10
dgtl[4,"height"] <- 10

dgtl$color <- "#4F364D"
dgtl[1,"color"]<-"#E9EFBF"
dgtl[2,"color"]<- "#E9EFBF"
dgtl[3,"color"]<- "#E9EFBF"
dgtl[4,"color"]<- "#E9EFBF"
dgtl[5,"color"]<- "#E9EFBF"
dgtl[6,"color"]<- "#E9EFBF"
dgtl[7,"color"]<- "#E9EFBF"
dgtl[8,"color"]<- "#E9EFBF"

dgtl[9,"color"]<- "#FBBE4F"
dgtl[10,"color"]<- "#FBBE4F"
dgtl[11,"color"]<- "#FBBE4F"
dgtl[12,"color"]<- "#FBBE4F"
dgtl[13,"color"]<- "#FBBE4F"
dgtl[14,"color"]<- "#FBBE4F"
dgtl[15,"color"]<- "#FBBE4F"
dgtl[16,"color"]<- "#FBBE4F"
dgtl[17,"color"]<- "#FBBE4F"
dgtl[18,"color"]<- "#FBBE4F"
dgtl[19,"color"]<- "#FBBE4F"
dgtl[20,"color"]<- "#FBBE4F"
dgtl[21,"color"]<- "#FBBE4F"

dgtl[22,"color"]<- "#737574"
dgtl[23,"color"]<- "#186134"
dgtl[24,"color"]<- "#186134"
dgtl[25,"color"]<- "#186134"
dgtl[26,"color"]<- "#186134"
dgtl[27,"color"]<- "#186134"

flows2$color_from <- "color"
flows2[1,"color_from"] <- "#14f593"
flows2[2,"color_from"] <- "#14f593"
flows2[3,"color_from"] <- "#14f593"
flows2[4,"color_from"] <- "#fa0505"
flows2[5,"color_from"] <- "#14f593"
flows2[6,"color_from"] <- "#14f593"
flows2[7,"color_from"] <- "#14f593"
flows2[8,"color_from"] <- "#14f593"
flows2[9,"color_from"] <- "#14f593"
flows2[10,"color_from"] <- "#fa0505"
flows2[11,"color_from"] <- "#fa0505"
flows2[12,"color_from"] <- "#14f593"
flows2[13,"color_from"] <- "#14f593"
flows2[14,"color_from"] <- "#14f593"
flows2[15,"color_from"] <- "#fa0505"
flows2[16,"color_from"] <- "#14f593"
flows2[17,"color_from"] <- "#14f593"
flows2[18,"color_from"] <- "#14f593"
flows2[19,"color_from"] <- "#14f593"

flows2$color_to <- "color"
flows2[1,"color_to"] <- "#14f593"
flows2[2,"color_to"] <- "#14f593"
flows2[3,"color_to"] <- "#14f593"
flows2[4,"color_to"] <- "#fa0505"
flows2[5,"color_to"] <- "#14f593"
flows2[6,"color_to"] <- "#14f593"
flows2[7,"color_to"] <- "#14f593"
flows2[8,"color_to"] <- "#14f593"
flows2[9,"color_to"] <- "#14f593"
flows2[10,"color_to"] <- "#fa0505"
flows2[11,"color_to"] <- "#fa0505"
flows2[12,"color_to"] <- "#14f593"
flows2[13,"color_to"] <- "#14f593"
flows2[14,"color_to"] <- "#14f593"
flows2[15,"color_to"] <- "#fa0505"
flows2[16,"color_to"] <- "#14f593"
flows2[17,"color_to"] <- "#14f593"
flows2[18,"color_to"] <- "#14f593"
flows2[19,"color_to"] <- "#14f593"


dgtl$fill_opacity <- 225
dgtl$fill_colour <- "#2980B"
dgtl[1,"fill_colour"] <- "?a"
dgtl[2,"fill_colour"] <- "#8E44AD"
dgtl[3,"fill_colour"] <- "#4A235A"
dgtl[4, "fill_colour"] <- "#A569BD"
dgtl[5, "fill_colour"] <- "#E74C3C"
dgtl[6, "fill_colour"] <- "#3498DB"
dgtl[7, "fill_colour"] <- "#3498DB"


dgtl$hover <- "Generatior <br> kWh 326 <br> CO2 0"
dgtl[1,"hover"]<-"Modular <br> kWh 4742 <br> CO2 0"
dgtl[2,"hover"]<- "Generator <br> kWh 326 <br> CO2 0"
dgtl[3,"hover"]<- "Skyline <br> kWh 844 <br> CO2 0 "
dgtl[4,"hover"]<- "Kornuit <br> kWh <br> CO2 0 "
dgtl[5,"hover"]<- "Art <br> kWh 970 <br> CO2 0  "
dgtl[6,"hover"]<- "AMP <br> kWh 2298 <br> CO2 0 "
dgtl[7,"hover"]<- "Live <br> kWh 960 <br> CO2 0"
dgtl[8,"hover"]<- "foodcourt <br> kWh 2964 <br> CO2 1648 kg "

dgtl[9,"hover"]<-"L1"
dgtl[10,"hover"]<- "L2"
dgtl[11,"hover"]<- "L3"
dgtl[12,"hover"]<- "L4"
dgtl[13,"hover"]<- "L5"
dgtl[14,"hover"]<- "L6"
dgtl[15,"hover"]<- "L7"
dgtl[16,"hover"]<- "L8"
dgtl[17,"hover"]<- "L9"
dgtl[18,"hover"]<- "L10 <br> CO2 422.5 kg"
dgtl[19,"hover"]<- "L11"
dgtl[20,"hover"]<-"L12"
dgtl[21,"hover"]<- "L13"

dgtl[22,"hover"]<- "E1 <br> kWh: 6020 <br> CO2: 2117kg <br> NOx: 9,16kg"
dgtl[23,"hover"]<- "E2 <br> kwh: 2139 <br> CO2: 0kg <br> Nox: 0kg" 
dgtl[24,"hover"]<- "E3 <br> kwh: 2139 <br> CO2: 0kg <br> Nox: 0kg" 
dgtl[25,"hover"]<- "E4 <br> kwh: 2139 <br> CO2: 0kg <br> Nox: 0kg" 
dgtl[26,"hover"]<- "E5 <br> kwh: 2139 <br> CO2: 0kg <br> Nox: 0kg" 
dgtl[27,"hover"]<- "E8 <br> kwh: 2139 <br> CO2: 0kg <br> Nox: 0kg" 


# Key for mapdeck, owned by Tes
key <- "pk.eyJ1IjoibWllZGVtYXRlcyIsImEiOiJjazV4dmVkbXcyMzQ3M2ttbG5kbzU3bWt4In0.G3RNl0RBO_tWTY1wYrv7tQ"

# Initialize mapdeck
# https://symbolixau.github.io/mapdeck/articles/mapdeck.html#the-basics
mapdeck(token = key, style = mapdeck_style("dark"), pitch = 50, zoom = 100) %>%
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
  , stroke_from = "color_from"
  , stroke_to = "color_to" 
    , stroke_width = "stroke")
