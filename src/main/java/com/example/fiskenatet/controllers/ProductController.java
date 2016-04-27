package com.example.fiskenatet.controllers;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.fiskenatet.models.ProductModel;
import com.example.fiskenatet.services.ProductService;

@RestController
public class ProductController {

    @Autowired //inkluderar alla dependency raderna ish.
    private ProductService productService;

    @CrossOrigin
    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public void createProduct(@RequestBody ProductModel productModel) {
        productService.saveProduct(productModel);
    }

    @CrossOrigin
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<ProductModel>> readAll() {
        return new ResponseEntity<ArrayList<ProductModel>>(productService.getAllProducts(), HttpStatus.OK);
    }
<<<<<<< HEAD


    @CrossOrigin
    @RequestMapping(value = "/products", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
=======
>>>>>>> 0c2f942d8bcd17245ff8fa042ab758ca2297a238
}

