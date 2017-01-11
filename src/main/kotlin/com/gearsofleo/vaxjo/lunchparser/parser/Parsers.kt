package com.gearsofleo.vaxjo.lunchparser.parser

import com.gearsofleo.vaxjo.lunchparser.domain.LunchItem
import com.gearsofleo.vaxjo.lunchparser.domain.Restaurant
import com.gearsofleo.vaxjo.lunchparser.domain.RestaurantLunch
import org.jsoup.Jsoup
import org.springframework.stereotype.Component


interface Parser {
    fun parse(): RestaurantLunch
    fun applicableRestaurant(): Restaurant
}

@Component
class MassimoParser : Parser {
    override fun applicableRestaurant() = Restaurant.MASSIMO

    override fun parse(): RestaurantLunch {
        val doc = Jsoup.connect("http://www.restaurangmassimo.se/").get()
        val lunchItems: MutableSet<LunchItem> = mutableSetOf()
        for (element in doc.select("main p.p2")) {
            val day = element.select("span b").text()
            element.select("span").remove()
            val items: MutableSet<String> = mutableSetOf()
            for (item in element.select("p").html().split("<br>")) {
                if (!item.isBlank()) {
                    items.add(item.trim());
                }
            }
            if (day != null && !items.isEmpty()) {
                if (isDay(day)) {
                    lunchItems.add(LunchItem(items = items, day = day))
                } else {
                    lunchItems.add(LunchItem(items = items, description = day))
                }
            }
        }
        return RestaurantLunch(applicableRestaurant(), lunchItems)
    }
}

@Component
class TeatroParser : Parser {
    override fun applicableRestaurant() = Restaurant.TEATRO

    override fun parse(): RestaurantLunch {
        val doc = Jsoup.connect("http://www.piazzateatro.se/#lunchmeny").get()
        var items: MutableSet<String> = mutableSetOf()
        for (element in doc.select(".piazza-lunch-title")) {
            items.add(element.text().drop(2))
        }
        return RestaurantLunch(applicableRestaurant(), setOf(LunchItem(items = items)))
    }
}

@Component
class JacksonsParser : Parser {
    override fun applicableRestaurant() = Restaurant.JACKSONS

    override fun parse(): RestaurantLunch {
        val doc = Jsoup.connect("http://restaurangjacksons.se/meny").get()
        val lunchItems: MutableSet<LunchItem> = mutableSetOf()
        var previousDay: String? = null
        var previousDescription: String? = null
        for (element in doc.select("#dagens p")) {
            if (previousDay != null) {
                lunchItems.add(LunchItem(day = previousDay, items = setOf(element.text())))
                previousDay = null
            }
            if (previousDescription != null) {
                lunchItems.add(LunchItem(description = previousDescription, items = setOf(element.text())))
                previousDescription = null
            }
            if (isDay(element.text())) {
                previousDay = element.text()
            }
            if (element.text().equals("FISK") || element.text().equals("VEGETARISK")) {
                previousDescription = element.text()
            }
        }
        return RestaurantLunch(applicableRestaurant(), lunchItems)
    }

}

@Component
class CavaParser : Parser {
    override fun applicableRestaurant() = Restaurant.CAVA

    override fun parse(): RestaurantLunch {
        val doc = Jsoup.connect("http://www.cavatapasbar.se/").get()
        doc.select("#meny-265 div").get(1).select("h2").remove()
        var items: MutableSet<String> = mutableSetOf()
        for (item in doc.select("#meny-265 div").get(1).text().split("•")) {
            if (!item.isBlank()) {
                items.add(item.substringBeforeLast(".").trim())

            }
        }
        return RestaurantLunch(applicableRestaurant(), setOf(LunchItem(items = items)))
    }
}

@Component
class CastellinaParser : Parser {
    override fun applicableRestaurant() = Restaurant.CASTELLINA

    override fun parse(): RestaurantLunch {
        val doc = Jsoup.connect("http://www.lacastellina.se/").get()
        val lunchItems: MutableSet<LunchItem> = mutableSetOf()
        for (element in doc.select("#lunchmeny-txt div")) {
            for (perDay in element.select("div").html().split("<p style=\"text-align: left;\"><span class=\"avenir-bold\">")) {
                if (!perDay.isBlank()) {
                    val parts = perDay.split("</span></p>")
                    if (parts.size == 2) {
                        if (isDay(parts[0])) {
                            lunchItems.add(LunchItem(day = parts[0], items = setOf(parts[1].trim())))
                        } else if (parts[0].trim().toUpperCase() == "VECKANS PASTA" || parts[0].trim().toUpperCase() == "VECKANS VEGETARISKA") {
                            lunchItems.add(LunchItem(description = parts[0], items = setOf(parts[1].trim())))
                        }
                    }
                }
            }

        }
        return RestaurantLunch(applicableRestaurant(), lunchItems)
    }

}

fun isDay(day: String): Boolean {
    when (day.toUpperCase()) {
        "MÅNDAG", "TISDAG", "ONSDAG", "TORSDAG", "FREDAG" -> return true
        else -> return false
    }
}

