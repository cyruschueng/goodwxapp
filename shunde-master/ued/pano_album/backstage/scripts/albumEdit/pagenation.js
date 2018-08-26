 /**
        * @name pages
        * @description 获取分页显示用的对象数组
        * [{number: 1, status: "disabled", label: '<'}, 
		* {number: 1, status: "active", label: '1'},
		* {number: 2, status: "", label: '2'}, 
		* {number: 2, status: "", label: '>'}]
        * @param {String} total 总页码
        * @param {String} current 当前页码
        * @returns {Array} 分页显示用的对象数组
        *
        * @example
        * <pre>
            var pages = ZCar.pages(20, 1);
        * </pre>
        * 
        */
function getPages(total, current,width) {
			if (!total || total < 2) {
				return [];
			}
            current = current || 1;
            current = current * 1;
            width = width ? width : 1;
            if(total <= 5) {
                total = total || 1;
                var pp = (current > 1) ? current - 1 : 1;
                var pages = [{number: pp, status: (pp == current ? "disabled" : ""), label: '&laquo;'}];
                try {
                 for (var i=1; i <= total; i++) {
                     pages.push({number: i, status: (i == current ? "active" : ""), label: '' + i});
                 }
                } catch(e) {
                 ZCar.log("Failed to parse json string: ", e);
                 return null;
                }
                pp = (current < total) ? current + 1 : total;
                pages.push({number: pp, status: (pp == current ? "disabled" : ""), label: '&raquo;'});
                return pages;
            }


            var start, end, i;
            var pages = [];
            start = Math.max(current - width, 1);
            end = Math.min(start + width * 2, total);
            for (i = start; i <= end; i++) {
                pages.push({number: i, status: (i == current ? "active" : ""), label: '' + i});
            }
            if (start > 2) {
                var pp = (current > 1) ? current - 1 : 1;
                pages.unshift({number: -1, status: "disabled", label: '...'});
                pages.unshift({number: 1, status: "", label: '1'});
                pages.unshift({number: pp, status: (pp == current ? "disabled" : ""), label: '&laquo;'});
            } else {
                var pp = (current > 1) ? current - 1 : 1;
                if(start == 2) {
                    pages.unshift({number: 1, status: "", label: '1'});
                }
                pages.unshift({number: pp, status: (pp == current ? "disabled" : ""), label: '&laquo;'});
            }
            if (total - end >= 2) {
                var pp = (current < total) ? current + 1 : total;
                pages.push({number: -1, status: "disabled", label: '...'});
                pages.push({number: total, status: "", label: '' + total});
                pages.push({number: pp, status: (pp == current ? "disabled" : ""), label: '&raquo;'});
            } else {
                var pp = (current < total) ? current + 1 : total;
                if (total - end == 1) {
                    pages.push({number: total, status: "", label: '' + total});                    
                }

                pages.push({number: pp, status: (pp == current ? "disabled" : ""), label: '&raquo;'});
            }
			return pages;
        }