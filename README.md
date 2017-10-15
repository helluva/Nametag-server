# Nametag-server
An image mirroring server for Nametag AR.

The Microsoft Azure Face API only accepts publicly-hosted image URLs as inputs. Nametag AR uploads face images to this server. This server makes the image publicly available at a URL.


## Endpoint

`POST hostImage`: 
 - `httpBody["image"]` is a base-64 encoded PNG file to make publicly available for download.
 - `httpBody["imageName"]` is the desired name of the file.
 - Returns `{'url': 'http://server.calstephens.tech:8081/images/${imageName}.png'}`
