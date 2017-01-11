package com.gearsofleo.vaxjo.lunchparser.domain

data class LunchItem(val day: String? = null, val description: String? = null, val items: Set<String>)
data class RestaurantLunch(val restaurant: Restaurant, val lunchItems: Set<LunchItem>)
data class Lunch(val restaurantLunches: Set<RestaurantLunch>)

enum class Restaurant(name: String) {
    MASSIMO("Massimo"),
    TEATRO("Massimo"),
    JACKSONS("Massimo"),
    CAVA("Massimo"),
    CASTELLINA("Massimo")
}