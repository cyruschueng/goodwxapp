#!/usr/bin/env bash

cd ../cos-java-sdk/
mvn clean
mvn -Ptest install

cd ../qcloudapi-sdk-java/
mvn clean
mvn -Ptest install

cd ../qcloud-service/
mvn clean
mvn -Ptest install

cd ../qcloud-service-impl/
mvn clean
mvn -Ptest install

cd ../qcloud-build/
