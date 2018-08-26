#!/usr/bin/env bash

cd ../cos-java-sdk/
mvn clean
mvn -Pdev install

cd ../qcloudapi-sdk-java/
mvn clean
mvn -Pdev install

cd ../qcloud-service/
mvn clean
mvn -Pdev install

cd ../qcloud-service-impl/
mvn clean
mvn -Pdev install

cd ../qcloud-build/
