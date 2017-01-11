package com.gearsofleo.vaxjo.lunchparser

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class LunchparserApplication

fun main(args: Array<String>) {
    SpringApplication.run(LunchparserApplication::class.java, *args)
}
