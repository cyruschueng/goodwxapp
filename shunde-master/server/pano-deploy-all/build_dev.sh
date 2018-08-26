#!/usr/bin/env bash
cd ../pano-common-service/
mvn clean
mvn -Pdev -DskipTests=true install

cd ../pano-common-web/
mvn clean
mvn -Pdev -DskipTests=true install

cd ../pano-viewer-service/
mvn clean
mvn -Pdev -DskipTests=true install

cd ../pano-viewer-service-impl/
mvn clean
mvn -Pdev -DskipTests=true package

cd ../pano-viewer-web/
mvn clean
mvn -Pdev -DskipTests=true package

cd ../pano-news-service/
mvn clean
mvn -Pdev -DskipTests=true install

cd ../pano-news-service-impl/
mvn clean
mvn -Pdev -DskipTests=true package

cd ../pano-news-web/
mvn clean
mvn -Pdev -DskipTests=true package

cd ../qcloud-service/
mvn clean
mvn -Pdev -DskipTests=true install

cd ../qcloud-service-impl/
mvn clean
mvn -Pdev -DskipTests=true package

cd ../pano-deploy-all/
