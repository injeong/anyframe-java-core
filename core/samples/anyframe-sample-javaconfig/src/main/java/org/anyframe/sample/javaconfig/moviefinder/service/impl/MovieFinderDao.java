/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.sample.javaconfig.moviefinder.service.impl;

/**
 * This MovieFinderDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Sooyeon Park
 */
import java.util.ArrayList;
import java.util.List;

import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;

public class MovieFinderDao {

	public MovieFinderDao() {
		System.out.println("Calling constructor of MovieDao");
	}
	
	public List<Movie> getPagingList(Movie movie, int pageIndex) throws Exception {
		Movie result = new Movie();
		
		result.setMovieId("MV-99999");
		result.setTitle("Alice in Wonderland");
		result.setDirector("Tim Burton");
		
		List<Movie> resultList = new ArrayList<Movie>();
		resultList.add(result);
		return resultList;
	}

}