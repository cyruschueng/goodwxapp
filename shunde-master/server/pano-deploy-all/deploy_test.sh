#!/usr/bin/env bash

# qcloud service
scp ../qcloud-service-impl/target/qcloud-service-impl-1.0.0.jar root@111.231.53.151:/data1/application/services/qcloud-service/qcloud-service-impl-1.0.0.jar
scp ../qcloud-service-impl/target/lib/*.* root@111.231.53.151:/data1/application/services/qcloud-service/lib

# pano viewer service
scp ../pano-viewer-service-impl/target/pano-viewer-service-impl-1.0.0.jar root@111.231.53.151:/data1/application/services/pano-viewer-service/pano-viewer-service-impl-1.0.0.jar
scp ../pano-viewer-service-impl/target/lib/*.* root@111.231.53.151:/data1/application/services/pano-viewer-service/lib
# pano viewer web
scp ../pano-viewer-web/target/pano-viewer-web-1.0.0.war root@111.231.53.151:/data1/application/services/pano-viewer-web-1.0.0.war

# pano news service
#scp ../pano-news-service-impl/target/pano-news-service-impl-1.0.0.jar root@111.231.53.151:/data1/application/services/pano-news-service/pano-news-service-impl-1.0.0.jar
#scp ../pano-news-service-impl/target/lib/*.* root@111.231.53.151:/data1/application/services/pano-news-service/lib
# pano news web
#scp ../pano-news-web/target/pano-news-web-1.0.0.war root@111.231.53.151:/data1/application/services/pano-news-web-1.0.0.war

# pano process
scp ../pano-process-service-impl/target/pano-process-service-impl-1.0.0.jar root@111.231.53.151:/data1/application/services/pano-process-service/pano-process-service-impl-1.0.0.jar
scp ../pano-process-service-impl/target/lib/*.* root@111.231.53.151:/data1/application/services/pano-process-service/lib

# user adapter
#scp ../vizen-module-user/target/vizen-module-user-1.0.0.jar root@111.231.53.151:/data1/application/services/vizen-module-user-1.0.0.jar

# user config
#scp ../vizen-module-user/src/main/resources/usersettings.yml root@111.231.53.151:/data1/application/services/usersettings.yml

#ansible shunde -u root -m shell -a "/data1/application/scripts/deploy-apps.sh"
