package com.gearsofleo.vaxjo.lunchparser

import com.gearsofleo.vaxjo.lunchparser.domain.Restaurant
import com.gearsofleo.vaxjo.lunchparser.domain.RestaurantLunch
import com.gearsofleo.vaxjo.lunchparser.parser.Parser
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping(path = arrayOf("/api"))
class RestController(private val parsers: List<Parser>) {

    private val LOGGER: Logger = LoggerFactory.getLogger(this.javaClass)

    @GetMapping(produces = arrayOf(MediaType.APPLICATION_JSON_VALUE), path = arrayOf("/restaurant"))
    fun restaurants(): Array<Restaurant> {
        return Restaurant.values()
    }

    @GetMapping(produces = arrayOf(MediaType.APPLICATION_JSON_VALUE), path = arrayOf("/lunch"))
    fun lunches(): MutableSet<RestaurantLunch> {
        val lunch: MutableSet<RestaurantLunch> = mutableSetOf()
        for (parser in parsers) {
            lunch.add(parser.parse())
        }
        return lunch;
    }

    @GetMapping(produces = arrayOf(MediaType.APPLICATION_JSON_VALUE), path = arrayOf("/lunch/{restaurant}"))
    fun lunchForRestaurant(@PathVariable restaurant: Restaurant): RestaurantLunch {
        return parsers.find({ it -> it.applicableRestaurant().equals(restaurant) })!!.parse()
    }
}

