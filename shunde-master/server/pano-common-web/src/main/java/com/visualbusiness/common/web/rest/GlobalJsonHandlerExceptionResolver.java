package com.visualbusiness.common.web.rest;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.Ordered;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

@Component
public class GlobalJsonHandlerExceptionResolver extends AbstractHandlerExceptionResolver {

	private static Logger logger = LogManager.getLogger(GlobalJsonHandlerExceptionResolver.class);

	private HttpMessageConverter<?>[] messageConverters = { new MappingJackson2HttpMessageConverter() };
	
	@Override
	public int getOrder() {
		return Ordered.HIGHEST_PRECEDENCE;
	}

	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		logger.error("发生错误：", ex);

		RestResult<?> data = RestResult.errorResult(ex.getMessage());

		try {
			return handleResponseBody(data, request, response);
		} catch (Exception e) {
			logger.error("发生错误：", e);
		}

		return null;
	}

	private ModelAndView handleResponseBody(Object data, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpInputMessage inputMessage = new ServletServerHttpRequest(request);

		List<MediaType> acceptedMediaTypes = inputMessage.getHeaders().getAccept();
		if (acceptedMediaTypes.isEmpty()) {
			acceptedMediaTypes = Collections.singletonList(MediaType.ALL);
		}

		MediaType.sortByQualityValue(acceptedMediaTypes);

		HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);

		Class<?> bodyType = data.getClass();

		HttpMessageConverter<?>[] converters = messageConverters;

		if (converters != null) {
			for (MediaType acceptedMediaType : acceptedMediaTypes) {
				for (HttpMessageConverter messageConverter : converters) {
					if (messageConverter.canWrite(bodyType, acceptedMediaType)) {
						messageConverter.write(data, acceptedMediaType, outputMessage);
						return new ModelAndView();
					}
				}
			}
		}

		logger.warn("Could not find HttpMessageConverter that supports return type " + bodyType + " and accepted media type "
				+ acceptedMediaTypes);
		return null;
	}
}