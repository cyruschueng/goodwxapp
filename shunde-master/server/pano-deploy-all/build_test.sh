#!/usr/bin/env bash

# qcloud
cd ../cos-java-sdk/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../qcloudapi-sdk-java/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../qcloud-service/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../qcloud-service-impl/
mvn clean
mvn -Ptest -DskipTests=true package

# common module
cd ../pano-common-service/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../pano-common-web/
mvn clean
mvn -Ptest -DskipTests=true install

# pano process
cd ../pano-process-service/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../pano-process-service-impl/
mvn clean
mvn -Ptest -DskipTests=true package

# pano viewer
cd ../pano-viewer-service/
mvn clean
mvn -Ptest -DskipTests=true install
cd ../pano-viewer-service-impl/
mvn clean
mvn -Ptest -DskipTests=true package
cd ../pano-viewer-web/
mvn clean
mvn -Ptest -DskipTests=true package

## pano news
#cd ../pano-news-service/
#mvn clean
#mvn -Ptest -DskipTests=true install
#cd ../pano-news-service-impl/
#mvn clean
#mvn -Ptest -DskipTests=true package
#cd ../pano-news-web/
#mvn clean
#mvn -Ptest -DskipTests=true package

cd ../pano-deploy-all/
